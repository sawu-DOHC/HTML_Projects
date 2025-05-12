document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  const radios = document.querySelectorAll('input[name="theme"]');

  let userSelected = false;

  // Default: time-based theme
  const hour = new Date().getHours();
  const isNight = hour < 6 || hour >= 18;
  if (isNight) {
    body.classList.add("dark");
    document.querySelector('input[value="night"]').checked = true;
  } else {
    body.classList.remove("dark");
    document.querySelector('input[value="day"]').checked = true;
  }

  // Manual override
  radios.forEach((radio) => {
    radio.addEventListener("change", (e) => {
      userSelected = true;
      if (e.target.value === "night") {
        body.classList.add("dark");
      } else {
        body.classList.remove("dark");
      }
    });
  });
});
