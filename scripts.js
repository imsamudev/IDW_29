import {
  inicializarMedicos,
  inicializarEspecialidades,
  inicializarObrasSociales,
  inicializarTurnos,
  inicializarReservas,
} from "./datos-iniciales.js";

document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("darkModeToggle");
  const html = document.documentElement;
  if (toggle) {
    const savedTheme = localStorage.getItem("theme") || "light";
    html.setAttribute("data-bs-theme", savedTheme);
    toggle.checked = savedTheme === "dark";

    toggle.addEventListener("change", () => {
      const theme = toggle.checked ? "dark" : "light";
      html.setAttribute("data-bs-theme", theme);
      localStorage.setItem("theme", theme);
    });
  }

  const passwordInput = document.getElementById("password");
  const toggleBtn = document.getElementById("togglePassword");
  const toggleIcon = document.getElementById("togglePasswordIcon");
  if (toggleBtn && passwordInput && toggleIcon) {
    toggleBtn.addEventListener("click", () => {
      const isPassword = passwordInput.type === "password";
      passwordInput.type = isPassword ? "text" : "password";
      toggleIcon.className = "bi " + (isPassword ? "bi-eye-slash" : "bi-eye");
    });
  }

  inicializarMedicos();
  inicializarEspecialidades();
  inicializarObrasSociales();
  inicializarTurnos();
  inicializarReservas();

  if (window.location.pathname.endsWith("login.html")) {
    const form = document.getElementById("loginForm");
    const errorDiv = document.getElementById("loginError");

    form.addEventListener("input", function () {
      errorDiv.style.display = "none";
    });

    form.addEventListener("submit", async function (e) {
      e.preventDefault();
      const username = form.username.value.trim();
      const password = form.password.value;

      if (!username || !password) {
        errorDiv.textContent = "Por favor complete todos los campos.";
        errorDiv.style.display = "block";
        return;
      }

      try {
        const response = await fetch("https://dummyjson.com/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, password }),
        });

        const data = await response.json();

        if (response.ok) {
          const userResponse = await fetch(
            `https://dummyjson.com/users/${data.id}`
          );
          const userData = await userResponse.json();

          if (userData.role !== "admin") {
            errorDiv.textContent =
              "Acceso denegado: No eres Administrador, contacta a soporte.";
            errorDiv.style.display = "block";
            return;
          }

          sessionStorage.setItem("accessToken", data.accessToken);
          sessionStorage.setItem(
            "userData",
            JSON.stringify({
              id: userData.id,
              username: userData.username,
              email: userData.email,
              firstName: userData.firstName,
              lastName: userData.lastName,
              role: userData.role,
            })
          );
          window.location.href = "admin.html";
        } else {
          errorDiv.textContent =
            data.message === "Invalid credentials"
              ? "Usuario o contraseña incorrectos"
              : "Error al iniciar sesión. Intente nuevamente.";
          errorDiv.style.display = "block";
        }
      } catch (error) {
        console.error("Error de conexión:", error);
        errorDiv.textContent =
          "Error de conexión. Verifique su internet e intente nuevamente.";
        errorDiv.style.display = "block";
      }
    });
  }

  if (window.location.pathname.includes("admin.html")) {
    const token = sessionStorage.getItem("accessToken");
    const userData = JSON.parse(sessionStorage.getItem("userData") || "{}");

    if (!token || !userData || userData.role !== "admin") {
      alert("Acceso denegado. Solo administradores pueden acceder.");
      sessionStorage.clear();
      window.location.href = "login.html";
      return;
    }

    const logoutBtn = document.getElementById("logoutBtn");
    if (logoutBtn) {
      logoutBtn.addEventListener("click", () => {
        sessionStorage.clear();
        window.location.href = "index.html";
      });
    }
  }
});
