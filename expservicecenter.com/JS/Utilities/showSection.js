function showSection(id) {
  const sections = document.querySelectorAll("main > section");

  for (let i = 0; i < sections.length; i++) {
    sections[i].classList.remove("visible");
  }

  const target = document.getElementById(id);
  target.classList.add("visible");

  // Force scroll after layout is applied
  requestAnimationFrame(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  });

  toggleMenu();
}
