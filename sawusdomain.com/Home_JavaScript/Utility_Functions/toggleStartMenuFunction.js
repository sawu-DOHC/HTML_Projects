function toggleStartMenu() {
    const startMenu = document.getElementById("start-menu");
    const isVisible = startMenu.style.display === "flex";

    startMenu.style.display = isVisible ? "none" : "flex";
}

// Close the start menu when clicking outside
document.addEventListener("click", (event) => {
    const startMenu = document.getElementById("start-menu");
    const startButton = document.getElementById("start-button");

    // Hide the start menu only if the click is outside of it and the button
    if (!startMenu.contains(event.target) && !startButton.contains(event.target)) {
        startMenu.style.display = "none";
    }
});
