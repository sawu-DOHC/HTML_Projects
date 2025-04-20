async function Interface_TimeConverter() {
    const windowBody = document.querySelector("#Window-Body-10"); // Ensure this matches the window ID
    if (!windowBody) return;

    windowBody.innerHTML = `
        <p>
            The Unix epoch is the time 00:00:00 which corresponds to January 1, 1970. 
            That moment serves as a reference point from which time in the digital realm is commonly measured in. 
            This means that any date and time is represented as the number of seconds that have elapsed since this point. 
            This app lets you measure the amount of seconds between any two points in time. This is useful when working with APIs.
        </p>

        <div id="alertBox"></div>

        <div id="startDiv" class="input-row">
            <label for="startDate">Start Date:</label>
            <input type="date" id="startDate">
            <label for="startTime">Start Time:</label>
            <input type="time" id="startTime">
        </div>

        <br><br>

        <div id="endDiv" class="input-row">
            <label for="endDate">End Date:</label>
            <input type="date" id="endDate">
            <label for="endTime">End Time:</label>
            <input type="time" id="endTime">
        </div>

        <div id="resultDiv">
            <div class="button-container">
                <button id="calculateButton" class="button">Calculate Difference</button>
            </div>
            <p>Result</p>
            <input type="text" id="resultBox" readonly>
        </div>
    `;
}

Interface_TimeConverter();
