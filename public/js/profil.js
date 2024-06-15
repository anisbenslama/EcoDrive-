// changement entre dark Mode et Light Mode 

document.addEventListener("DOMContentLoaded", function() {
  const currentTheme = localStorage.getItem("theme") || "light";
  document.body.classList.add(currentTheme + "-mode");
  const themeToggleBtn = document.getElementById("theme-toggle");

  themeToggleBtn.textContent = currentTheme === "light" ? "Dark Mode" : "Light Mode";

  themeToggleBtn.addEventListener("click", function() {
    document.body.classList.toggle("light-mode");
    document.body.classList.toggle("dark-mode");
    const newTheme = document.body.classList.contains("dark-mode") ? "dark" : "light";
    localStorage.setItem("theme", newTheme);
    themeToggleBtn.textContent = newTheme === "light" ? "Dark Mode" : "Light Mode";
  });
});
