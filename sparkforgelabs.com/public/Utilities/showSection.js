function showSection(sectionId) {
  const overlay = document.getElementById('section-fade-overlay');
  const sections = document.querySelectorAll('main > section:not(#section-fade-overlay)');
  const targetSection = document.getElementById(sectionId);

  if (!targetSection || targetSection.classList.contains('visible')) return;

  overlay.style.opacity = '1';

  setTimeout(() => {
    sections.forEach(section => {
      section.style.display = 'none';
      section.classList.remove('visible');
    });

    targetSection.style.display = 'block';
    requestAnimationFrame(() => {
      targetSection.classList.add('visible');
    });

    setTimeout(() => {
      overlay.style.opacity = '0';
    }, 50);

    // ✅ Auto-collapse nav if on mobile
    if (window.innerWidth <= 850) {
      const nav = document.querySelector('nav');
      if (nav) nav.classList.add('collapsed');
    }

  }, 1);
}
