// Stopwatch Logic
let stopwatchInterval;
let stopwatchTime = 0;

function startStopwatch() {
    if (stopwatchInterval) return; 

    stopwatchInterval = setInterval(function () {
        stopwatchTime++;
        updateStopwatchDisplay();
    }, 1000);
}

function stopStopwatch() {

    clearInterval(stopwatchInterval);
    stopwatchInterval = null;
}

function resetStopwatch() {

    stopStopwatch();
    stopwatchTime = 0;
    updateStopwatchDisplay();

}

function updateStopwatchDisplay() {

    var hours = Math.floor(stopwatchTime / 3600).toString().padStart(2, '0');
    var minutes = Math.floor((stopwatchTime % 3600) / 60).toString().padStart(2, '0');
    var seconds = (stopwatchTime % 60).toString().padStart(2, '0');
    document.getElementById('stopwatch-display').textContent = hours + ":" + minutes + ":" + seconds;

}















// Timer Logic
let timerInterval;
let timerTimeRemaining = 0;

function startTimer() {
    var minutesInput = document.getElementById('timer-minutes').value;
    var secondsInput = document.getElementById('timer-seconds').value;

    timerTimeRemaining = parseInt(minutesInput || 0) * 60 + parseInt(secondsInput || 0);

    if (timerTimeRemaining <= 0) return; // Exit if no valid time is set

    if (timerInterval) return; // Prevent multiple intervals

    timerInterval = setInterval(function () {
        if (timerTimeRemaining > 0) {

            timerTimeRemaining--;
            updateTimerDisplay();

        } 
        else {

            clearInterval(timerInterval);
            timerInterval = null;
            alert("Time's up!");

        }
    }, 1000);
}

function stopTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
}

function resetTimer() {

    stopTimer();
    timerTimeRemaining = 0;
    updateTimerDisplay();

}

function updateTimerDisplay() {

    var minutes = Math.floor(timerTimeRemaining / 60).toString().padStart(2, '0');
    var seconds = (timerTimeRemaining % 60).toString().padStart(2, '0');
    document.getElementById('timer-display').textContent = minutes + ":" + seconds;

}
