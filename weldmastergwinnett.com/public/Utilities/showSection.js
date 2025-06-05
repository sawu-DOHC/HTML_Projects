function showSection(id) {
  const allSections = document.querySelectorAll("main > section");
  const target = document.getElementById(id);

  if (!target) return;

  if (id === "Home") {
    allSections.forEach(section => {
      if (section.id === "Leaderboard") return; // ❌ Don't touch Leaderboard
      section.classList.add("visible");
      section.classList.remove("hidden");
    });
    return;
  }

  allSections.forEach(section => {
    if (section.id === "Leaderboard") return; // ❌ Don't touch Leaderboard
    section.classList.remove("visible");
    section.classList.add("hidden");
  });

  target.classList.remove("hidden");
  target.classList.add("visible");
}
