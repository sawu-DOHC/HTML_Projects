function updateClock() {
    const date_object = new Date();

    let int_hours = date_object.getHours();
    let int_minutes = date_object.getMinutes();
    let int_seconds = date_object.getSeconds();

    let string_ampm;

    let string_hours;
    let string_minutes;
    let string_seconds;

    // Determine AM/PM
    if (int_hours >= 12) {
        string_ampm = 'PM';
    } 
    else {
        string_ampm = 'AM';
    }

    // Convert hours to 12-hour format
    if (int_hours > 12) {
        int_hours -= 12;
    } 
    else if (int_hours === 0) {
        int_hours = 12;
    }

    // Format hours as a string
    if (int_hours < 10) {
        string_hours = '0' + int_hours;
    } 
    else {
        string_hours = int_hours.toString();
    }

    // Format minutes as a string
    if (int_minutes < 10) {
        string_minutes = '0' + int_minutes;
    } 
    else {
        string_minutes = int_minutes.toString();
    }

    // Format seconds as a string
    if (int_seconds < 10) {
        string_seconds = '0' + int_seconds;
    } 
    else {
        string_seconds = int_seconds.toString();
    }

    // Construct clock time string and update DOM
    const string_clockTime = `${string_hours}:${string_minutes}:${string_seconds} ${string_ampm}`;
    document.getElementById('clock-time').innerText = string_clockTime;
}

function initializeClock() {
    updateClock(); 
    setInterval(updateClock, 1000); 
}

document.addEventListener('DOMContentLoaded', initializeClock);
