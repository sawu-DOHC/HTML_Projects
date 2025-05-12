document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("theme-form");
    const radios = form.querySelectorAll('input[name="theme"]');
  
    // Time-based theme on initial load
    const hour = new Date().getHours();
    const isNight = hour < 6 || hour >= 18; // Dark mode before 6AM or after 6PM
    document.body.classList.toggle("dark", isNight);
  
    // Reflect that choice in the form
    radios.forEach(radio => {
      radio.checked = (radio.value === (isNight ? "night" : "day"));
    });
  
    // Listen for manual changes
    radios.forEach(radio => {
      radio.addEventListener("change", () => {
        document.body.classList.toggle("dark", radio.value === "night");
      });
    });
  });
  