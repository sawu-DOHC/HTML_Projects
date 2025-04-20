document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.getElementById("hamburger");
  const navs = document.querySelectorAll("nav");
  const navButtons = document.querySelectorAll(".nav-button");
  const sections = document.querySelectorAll("main section");

  // Mobile: toggle nav visibility
  if (hamburger) {
    hamburger.addEventListener("click", () => {
      document.querySelector(".mobile-header nav").classList.toggle("show-nav");
    });
  }

  // Shared nav button behavior (desktop + mobile)
  navButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const sectionId = button.id.replace("-btn", ""); // e.g., "about-btn" → "about"

      // Show the selected section, hide others
      sections.forEach((section) => {
        section.style.display = section.id === sectionId ? "block" : "none";
      });

      // Highlight active nav button
      navButtons.forEach((btn) => {
        btn.classList.toggle("nav-button-active", btn === button);
      });

      // Hide mobile nav after click
      if (window.innerWidth <= 850) {
        const mobileNav = document.querySelector(".mobile-header nav");
        if (mobileNav) mobileNav.classList.remove("show-nav");
      }
    });
  });

  // Optional: show "home" section by default
  const defaultSection = document.getElementById("home");
  if (defaultSection) defaultSection.style.display = "block";
});
