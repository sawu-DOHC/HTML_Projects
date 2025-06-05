document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  const modeRadios = document.querySelectorAll('input[name="mode"]');
  const seasonRadios = document.querySelectorAll('input[name="season"]');

  const hour = new Date().getHours();
  const defaultMode = (hour < 6 || hour >= 18) ? "night" : "day";

  const month = new Date().getMonth(); // Jan = 0
  let defaultSeason;
  if (month >= 2 && month <= 4) defaultSeason = "spring";      // Mar–May
  else if (month >= 5 && month <= 7) defaultSeason = "summer"; // Jun–Aug
  else if (month >= 8 && month <= 10) defaultSeason = "fall";  // Sep–Nov
  else defaultSeason = "winter";                               // Dec–Feb

  applyTheme(defaultMode, defaultSeason);
  setChecked("mode", defaultMode);
  setChecked("season", defaultSeason);

  modeRadios.forEach(radio =>
    radio.addEventListener("change", () => {
      applyTheme(getChecked("mode"), getChecked("season"));
    })
  );

  seasonRadios.forEach(radio =>
    radio.addEventListener("change", () => {
      applyTheme(getChecked("mode"), getChecked("season"));
    })
  );

  function applyTheme(mode, season) {
    // Remove all existing theme-related classes
    body.className = `${season}-${mode}`;
  }

  function getChecked(name) {
    const checked = document.querySelector(`input[name="${name}"]:checked`);
    return checked ? checked.value : null;
  }

  function setChecked(name, value) {
    const radios = document.querySelectorAll(`input[name="${name}"]`);
    radios.forEach(radio => {
      radio.checked = (radio.value === value);
    });
  }
});
