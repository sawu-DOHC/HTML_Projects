function showSection(id) {
    const sections = document.querySelectorAll('main > section');
    sections.forEach(section => {
      section.classList.remove('visible');
    });
  
    const target = document.getElementById(id);
    if (target) {
      target.classList.add('visible');
    }
  }
  