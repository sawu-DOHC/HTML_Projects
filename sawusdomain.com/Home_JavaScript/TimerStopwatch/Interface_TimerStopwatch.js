async function Interface_TimerStopwatch() {
    const windowBody = document.querySelector("#Window-Body-11"); // Updated to the correct window ID

    //console.log("Selected window-body: ", windowBody);

    windowBody.innerHTML = '';  

    // Stopwatch Section
    const stopwatchContainer = document.createElement('div');
    stopwatchContainer.id = 'stopwatch-container';

    const stopwatchTitle = document.createElement('h2');
    stopwatchTitle.textContent = 'Stopwatch';
    stopwatchContainer.appendChild(stopwatchTitle);

    const stopwatchDisplay = document.createElement('p');
    stopwatchDisplay.id = 'stopwatch-display';
    stopwatchDisplay.textContent = '00:00:00';
    stopwatchContainer.appendChild(stopwatchDisplay);

    const stopwatchButtonContainer = document.createElement('div');
    stopwatchButtonContainer.className = 'button-container';

    const startStopwatchButton = document.createElement('button');
    startStopwatchButton.id = 'start-stopwatch';
    startStopwatchButton.className = 'button start-button';
    startStopwatchButton.textContent = 'Start';

    startStopwatchButton.addEventListener('click', function() {
        Controller_TimerStopwatch.startStopwatch();
    });
    stopwatchButtonContainer.appendChild(startStopwatchButton);

    const stopStopwatchButton = document.createElement('button');
    stopStopwatchButton.id = 'stop-stopwatch';
    stopStopwatchButton.className = 'button stop-button';
    stopStopwatchButton.textContent = 'Stop';

    stopStopwatchButton.addEventListener('click', function() {
        Controller_TimerStopwatch.stopStopwatch();
    });
    stopwatchButtonContainer.appendChild(stopStopwatchButton);

    const resetStopwatchButton = document.createElement('button');
    resetStopwatchButton.id = 'reset-stopwatch';
    resetStopwatchButton.className = 'button reset-button';
    resetStopwatchButton.textContent = 'Reset';

    resetStopwatchButton.addEventListener('click', function() {
        Controller_TimerStopwatch.resetStopwatch();
    });
    stopwatchButtonContainer.appendChild(resetStopwatchButton);

    stopwatchContainer.appendChild(stopwatchButtonContainer);
    windowBody.appendChild(stopwatchContainer);

    // Timer Section
    const timerContainer = document.createElement('div');
    timerContainer.id = 'timer-container';

    const timerTitle = document.createElement('h2');
    timerTitle.textContent = 'Timer';
    timerContainer.appendChild(timerTitle);

    const timerMinutesLabel = document.createElement('label');
    timerMinutesLabel.setAttribute('for', 'timer-minutes');
    timerMinutesLabel.textContent = 'Minutes:';
    timerContainer.appendChild(timerMinutesLabel);

    const timerMinutesInput = document.createElement('input');
    timerMinutesInput.type = 'number';
    timerMinutesInput.id = 'timer-minutes';
    timerMinutesInput.min = '0';
    timerMinutesInput.placeholder = '0';
    timerContainer.appendChild(timerMinutesInput);

    const timerSecondsLabel = document.createElement('label');
    timerSecondsLabel.setAttribute('for', 'timer-seconds');
    timerSecondsLabel.textContent = 'Seconds:';
    timerContainer.appendChild(timerSecondsLabel);

    const timerSecondsInput = document.createElement('input');
    timerSecondsInput.type = 'number';
    timerSecondsInput.id = 'timer-seconds';
    timerSecondsInput.min = '0';
    timerSecondsInput.max = '59';
    timerSecondsInput.placeholder = '0';
    timerContainer.appendChild(timerSecondsInput);

    const timerDisplay = document.createElement('p');
    timerDisplay.id = 'timer-display';
    timerDisplay.textContent = '00:00';
    timerContainer.appendChild(timerDisplay);

    const timerButtonContainer = document.createElement('div');
    timerButtonContainer.className = 'button-container';

    const startTimerButton = document.createElement('button');
    startTimerButton.id = 'start-timer';
    startTimerButton.className = 'button start-button';
    startTimerButton.textContent = 'Start';


    startTimerButton.addEventListener('click', function() {
        Controller_TimerStopwatch.startTimer();
    });
    timerButtonContainer.appendChild(startTimerButton);

    const stopTimerButton = document.createElement('button');
    stopTimerButton.id = 'stop-timer';
    stopTimerButton.className = 'button stop-button';
    stopTimerButton.textContent = 'Stop';


    stopTimerButton.addEventListener('click', function() {
        Controller_TimerStopwatch.stopTimer();
    });
    timerButtonContainer.appendChild(stopTimerButton);

    const resetTimerButton = document.createElement('button');
    resetTimerButton.id = 'reset-timer';
    resetTimerButton.className = 'button reset-button';
    resetTimerButton.textContent = 'Reset';

    
    resetTimerButton.addEventListener('click', function() {
        Controller_TimerStopwatch.resetTimer();
    });
    timerButtonContainer.appendChild(resetTimerButton);

    timerContainer.appendChild(timerButtonContainer);
    windowBody.appendChild(timerContainer);
}

Interface_TimerStopwatch();