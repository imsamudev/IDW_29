import {
  inicializarAdmin,
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

  inicializarAdmin();
  inicializarMedicos();
  inicializarEspecialidades();
  inicializarObrasSociales();
  inicializarTurnos();
  inicializarReservas();

  if (window.location.pathname.endsWith("login.html")) {
    const form = document.getElementById("loginForm");
    const errorDiv = document.getElementById("loginError");
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      const username = form.username.value.trim();
      const password = form.password.value;
      const adminUser = JSON.parse(localStorage.getItem("adminUser"));
      if (
        adminUser &&
        username === adminUser.username &&
        password === adminUser.password
      ) {
        localStorage.setItem("isAdminLogged", "true");
        window.location.href = "admin.html";
      } else {
        errorDiv.textContent = "Usuario o contraseña incorrectos";
        errorDiv.style.display = "block";
      }
    });
  }

  if (window.location.pathname.includes("admin.html")) {
    if (!localStorage.getItem("isAdminLogged")) {
      window.location.href = "login.html";
      return;
    }
    const logoutBtn = document.getElementById("logoutBtn");
    if (logoutBtn) {
      logoutBtn.addEventListener("click", () => {
        localStorage.removeItem("isAdminLogged");
        window.location.href = "index.html";
      });
    }
  }
});
