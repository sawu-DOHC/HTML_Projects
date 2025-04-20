async function Interface_TimerStopwatch() {
    const windowBody = document.querySelector("#Window-Body-11");
    if (!windowBody) return;

    windowBody.innerHTML = `
        <div id="stopwatch-container">
            <h2>Stopwatch</h2>
            <p id="stopwatch-display">00:00:00</p>
            <div class="button-container">
                <button id="start-stopwatch" class="button start-button">Start</button>
                <button id="stop-stopwatch"  class="button stop-button" >Stop </button>
                <button id="reset-stopwatch" class="button reset-button">Reset</button>
            </div>
        </div>

        <div id="timer-container">
            <h2>Timer</h2>
            <label for="timer-minutes">Minutes:</label>
            <input type="number" id="timer-minutes" min="0" placeholder="0">
            <label for="timer-seconds">Seconds:</label>
            <input type="number" id="timer-seconds" min="0" max="59" placeholder="0">
            <p id="timer-display">00:00</p>
            <div class="button-container">
                <button id="start-timer" class="button start-button">Start</button>
                <button id="stop-timer"  class="button stop-button">Stop</button>
                <button id="reset-timer" class="button reset-button">Reset</button>
            </div>
        </div>
    `;

    // ✅ Attach event listeners dynamically after setting innerHTML
    document.getElementById("start-stopwatch").addEventListener("click", () => Controller_TimerStopwatch.startStopwatch());
    document.getElementById("stop-stopwatch").addEventListener("click", () => Controller_TimerStopwatch.stopStopwatch());
    document.getElementById("reset-stopwatch").addEventListener("click", () => Controller_TimerStopwatch.resetStopwatch());

    document.getElementById("start-timer").addEventListener("click", () => Controller_TimerStopwatch.startTimer());
    document.getElementById("stop-timer").addEventListener("click", () => Controller_TimerStopwatch.stopTimer());
    document.getElementById("reset-timer").addEventListener("click", () => Controller_TimerStopwatch.resetTimer());
}

Interface_TimerStopwatch();
