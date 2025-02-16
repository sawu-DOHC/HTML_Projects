async function Interface_TimeConverter() {

    const windowBody = document.querySelector("#Window-Body-10"); // Ensure this matches the window ID

    //console.log("Selected window-body: ", windowBody);


    windowBody.innerHTML = '';


    const explanationParagraph = document.createElement('p');
    explanationParagraph.innerHTML = `
        The Unix epoch is the time 00:00:00 which corresponds to January 1, 1970. 
        That moment serves as a reference point from which time in the digital realm is commonly measured in. 
        This means that any date and time is represented as the number of seconds that have elapsed since this point. 
        This app lets you measure the amount of seconds between any two points in time. This is useful when working with APIs.
    `;
    windowBody.appendChild(explanationParagraph);


    const alertBox = document.createElement('div');
    alertBox.id = 'alertBox';
    windowBody.appendChild(alertBox);


    const startDiv = document.createElement('div');
    startDiv.id = 'startDiv';
    startDiv.className = 'input-row';

    const startDateLabel = document.createElement('label');
    startDateLabel.setAttribute('for', 'startDate');
    startDateLabel.textContent = 'Start Date:';
    startDiv.appendChild(startDateLabel);

    const startDateInput = document.createElement('input');
    startDateInput.type = 'date';
    startDateInput.id = 'startDate';
    startDiv.appendChild(startDateInput);

    const startTimeLabel = document.createElement('label');
    startTimeLabel.setAttribute('for', 'startTime');
    startTimeLabel.textContent = 'Start Time:';
    startDiv.appendChild(startTimeLabel);

    const startTimeInput = document.createElement('input');
    startTimeInput.type = 'time';
    startTimeInput.id = 'startTime';
    startDiv.appendChild(startTimeInput);

    windowBody.appendChild(startDiv);

    windowBody.appendChild(document.createElement('br'));
    windowBody.appendChild(document.createElement('br'));


    const endDiv = document.createElement('div');
    endDiv.id = 'endDiv';
    endDiv.className = 'input-row';

    const endDateLabel = document.createElement('label');
    endDateLabel.setAttribute('for', 'endDate');
    endDateLabel.textContent = 'End Date:';
    endDiv.appendChild(endDateLabel);

    const endDateInput = document.createElement('input');
    endDateInput.type = 'date';
    endDateInput.id = 'endDate';
    endDiv.appendChild(endDateInput);

    const endTimeLabel = document.createElement('label');
    endTimeLabel.setAttribute('for', 'endTime');
    endTimeLabel.textContent = 'End Time:';
    endDiv.appendChild(endTimeLabel);

    const endTimeInput = document.createElement('input');
    endTimeInput.type = 'time';
    endTimeInput.id = 'endTime';
    endDiv.appendChild(endTimeInput);

    windowBody.appendChild(endDiv);

    const resultDiv = document.createElement('div');
    resultDiv.id = 'resultDiv';

    const buttonContainer = document.createElement('div');
    buttonContainer.className = 'button-container';

    const calculateButton = document.createElement('button');
    calculateButton.id = 'calculateButton';
    calculateButton.className = 'button';
    calculateButton.textContent = 'Calculate Difference';
    calculateButton.addEventListener('click', Controller_TimeConverter);
    buttonContainer.appendChild(calculateButton);

    resultDiv.appendChild(buttonContainer);

    const resultText = document.createElement('p');
    resultText.textContent = 'Result';
    resultDiv.appendChild(resultText);

    const resultBox = document.createElement('input');
    resultBox.type = 'text';
    resultBox.id = 'resultBox';
    resultBox.setAttribute('readonly', true);  
    resultDiv.appendChild(resultBox);

    windowBody.appendChild(resultDiv);
}

Interface_TimeConverter();