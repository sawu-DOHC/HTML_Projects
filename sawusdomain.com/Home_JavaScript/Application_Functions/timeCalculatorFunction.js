function calculateDifference() {

    const startDate = document.getElementById("startDate").value;
    const startTime = document.getElementById("startTime").value;
    const endDate = document.getElementById("endDate").value;
    const endTime = document.getElementById("endTime").value;
    const alertBox = document.getElementById("alertBox");

    if (!startDate || !startTime || !endDate || !endTime) {
        alertBox.textContent = "Please fill in all date and time fields!";
        alertBox.style.display = "block"; 
        return;
    }

    const start = new Date(`${startDate}T${startTime}`);
    const end = new Date(`${endDate}T${endTime}`);

    if (start >= end) {
        alertBox.textContent = "Start date and time must be before the end date and time!";
        alertBox.style.display = "block"; 
        return;
    }

    const diffInSeconds = Math.floor( (end - start) / 1000 );
    document.getElementById("resultBox").value = diffInSeconds;
    alertBox.style.display = "none"; 
}

function updateCurrentTime() {
    
    const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds since Unix epoch
    document.getElementById("currentTimeDisplay").textContent = currentTime;
}
setInterval(updateCurrentTime, 1000);