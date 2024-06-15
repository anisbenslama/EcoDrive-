// settings.js

document.addEventListener("DOMContentLoaded", function() {
  const currentTheme = localStorage.getItem("theme") || "light";
  document.body.classList.add(currentTheme + "-mode");

  document.getElementById("theme").value = currentTheme;
});

function toggleTheme(theme) {
  document.body.classList.toggle("light-mode", theme === "light");
  document.body.classList.toggle("dark-mode", theme === "dark");
  localStorage.setItem("theme", theme);
}
