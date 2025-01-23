document.addEventListener("DOMContentLoaded", () => {
    initializeStartMenu();
});

function initializeStartMenu() {
    const startButton = document.getElementById("start-button");
    const startMenu = document.getElementById("start-menu");


    startButton.addEventListener("click", () => {
        const isVisible = startMenu.style.display === "flex";
        startMenu.style.display = isVisible ? "none" : "flex";
    });

    document.addEventListener("click", (event) => {
        if (!startMenu.contains(event.target) && !startButton.contains(event.target)) {
            startMenu.style.display = "none";
            startButton.classList.remove("clicked");
        }
    });
}

