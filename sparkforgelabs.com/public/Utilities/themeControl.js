document.addEventListener('DOMContentLoaded', () => {
  const modeRadios = document.querySelectorAll('input[name="mode"]');

  // Detect time of day and apply theme
  const hour = new Date().getHours();
  const initialMode = (hour >= 6 && hour < 18) ? 'day' : 'night';
  document.body.classList.add(initialMode);

  // Update radio button to match initial mode
  const activeRadio = document.querySelector(`input[name="mode"][value="${initialMode}"]`);
  if (activeRadio) activeRadio.checked = true;

  // Allow manual toggling
  modeRadios.forEach(radio => {
    radio.addEventListener('change', () => {
      document.body.classList.remove('day', 'night');
      document.body.classList.add(radio.value);
    });
  });
});
