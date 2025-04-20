function showSection(sectionId) {
    const overlay = document.getElementById('section-fade-overlay');
    const sections = document.querySelectorAll('main > section:not(#section-fade-overlay)');
    const targetSection = document.getElementById(sectionId);
  
    // Don’t bother if the section is already active
    if (targetSection.classList.contains('visible')) return;
  
    // Step 1: Fade in the overlay
    overlay.style.opacity = '1';
  
    setTimeout(() => {
      // Step 2: Hide all other sections
      sections.forEach(section => {
        section.style.display = 'none';
        section.classList.remove('visible');
      });
  
      // Step 3: Show the target section
      targetSection.style.display = 'block';
      requestAnimationFrame(() => {
        targetSection.classList.add('visible');
      });
  
      // Step 4: Fade overlay back to clear
      setTimeout(() => {
        overlay.style.opacity = '0';
      }, 50);
  
    }, 1); // match the overlay fade-in duration
  }
  