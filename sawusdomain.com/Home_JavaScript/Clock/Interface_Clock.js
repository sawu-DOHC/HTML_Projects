function createClock() {
    // Create a new div element for the clock
    const clock = document.createElement('div');
    clock.id = 'clock';  // Set the id of the clock container

    // Create a span element for displaying the time
    const clockTime = document.createElement('span');
    clockTime.id = 'clock-time';  // Set the id for the time display
    clock.appendChild(clockTime);  // Append the clock time span to the clock div

    // Append the clock div to the body or any container you need
    document.getElementById("taskbar").appendChild(clockTime);

    // Start updating the clock every second
    setInterval(() => {
        const now = new Date();
        const time = now.toLocaleTimeString();  // Get the current time as a string
        clockTime.textContent = time;  // Update the clock time display
    }, 1000);  // Update every second
}
