class Controller_TimerStopwatch {
    // Stopwatch Variables
    static stopwatchInterval = null;
    static stopwatchTime = 0;

    // Timer Variables
    static timerInterval = null;
    static timerTimeRemaining = 0;

    // Stopwatch Methods
    static startStopwatch() {
        if (this.stopwatchInterval) return;  // Prevent multiple intervals

        this.stopwatchInterval = setInterval(() => {
            this.stopwatchTime++;  // Increment stopwatch time every second
            this.updateStopwatchDisplay();  // Update the display
        }, 1000);
    }

    static stopStopwatch() {
        clearInterval(this.stopwatchInterval);  // Stop the stopwatch
        this.stopwatchInterval = null;
    }

    static resetStopwatch() {
        this.stopStopwatch();  // Stop the stopwatch first
        this.stopwatchTime = 0;  // Reset time to zero
        this.updateStopwatchDisplay();  // Update the display
    }

    static updateStopwatchDisplay() {
        const hours = Math.floor(this.stopwatchTime / 3600).toString().padStart(2, '0');
        const minutes = Math.floor((this.stopwatchTime % 3600) / 60).toString().padStart(2, '0');
        const seconds = (this.stopwatchTime % 60).toString().padStart(2, '0');
        document.getElementById('stopwatch-display').textContent = `${hours}:${minutes}:${seconds}`;
    }

    // Timer Methods
    static startTimer() {
        const minutesInput = document.getElementById('timer-minutes').value;
        const secondsInput = document.getElementById('timer-seconds').value;

        // Convert the input to seconds
        this.timerTimeRemaining = parseInt(minutesInput || 0) * 60 + parseInt(secondsInput || 0);

        if (this.timerTimeRemaining <= 0) return;  // Exit if no valid time is set

        if (this.timerInterval) return;  // Prevent multiple intervals

        this.timerInterval = setInterval(() => {
            if (this.timerTimeRemaining > 0) {
                this.timerTimeRemaining--;  // Decrease the remaining time
                this.updateTimerDisplay();  // Update the display
            } else {
                clearInterval(this.timerInterval);  // Stop the timer when time's up
                this.timerInterval = null;
                alert("Time's up!");  // Alert the user
            }
        }, 1000);
    }

    static stopTimer() {
        clearInterval(this.timerInterval);  // Stop the timer
        this.timerInterval = null;
    }

    static resetTimer() {
        this.stopTimer();  // Stop the timer first
        this.timerTimeRemaining = 0;  // Reset remaining time to zero
        this.updateTimerDisplay();  // Update the display
    }

    static updateTimerDisplay() {
        const minutes = Math.floor(this.timerTimeRemaining / 60).toString().padStart(2, '0');
        const seconds = (this.timerTimeRemaining % 60).toString().padStart(2, '0');
        document.getElementById('timer-display').textContent = `${minutes}:${seconds}`;
    }
}
