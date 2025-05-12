function toggleMenu() {
  const menu = document.querySelector("nav > ul");
  if (menu) {
    menu.classList.toggle("active");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("menu-toggle");
  if (toggle) {
    toggle.addEventListener("click", toggleMenu);
  }
});
