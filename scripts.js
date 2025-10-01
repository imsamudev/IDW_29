const toggle = document.getElementById("darkModeToggle");
const html = document.documentElement;

const savedTheme = localStorage.getItem("theme") || "light";
html.setAttribute("data-bs-theme", savedTheme);
toggle.checked = savedTheme === "dark";

toggle.addEventListener("change", () => {
  const theme = toggle.checked ? "dark" : "light";
  html.setAttribute("data-bs-theme", theme);
  localStorage.setItem("theme", theme);
});
