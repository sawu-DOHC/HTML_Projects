function toggleMenu() {
  const menu = document.querySelector("nav > ul");
    menu.classList.toggle("active");
  
}

document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("menuButton");
    toggle.addEventListener("click", toggleMenu);
  
});