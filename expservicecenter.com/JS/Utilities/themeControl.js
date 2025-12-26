document.addEventListener('DOMContentLoaded', () => {
  const radios = document.querySelectorAll('input[name="mode"]');
  const hour = new Date().getHours();
  const mode = (hour >= 18 || hour < 6) ? 'night' : 'day';

  document.body.classList.add(mode);
  const defaultRadio = document.querySelector(`input[name="mode"][value="${mode}"]`);
  if (defaultRadio) defaultRadio.checked = true;

  radios.forEach(radio => {
    radio.addEventListener('change', () => {
      document.body.classList.remove('day', 'night');
      document.body.classList.add(radio.value);
    });
  });
});
