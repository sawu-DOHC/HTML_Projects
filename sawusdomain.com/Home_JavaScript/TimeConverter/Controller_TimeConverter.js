async function Controller_TimeConverter() {

    let alertBox = document.getElementById("alertBox");
    let resultBox = document.getElementById("resultBox");
    let calculateButton = document.getElementById("calculateButton");

    if (!calculateButton) {
        console.error("Controller_TimeConverter: calculateButton not found.");
        return;
    }

    calculateButton.addEventListener( "click", () => {

        let startDate = document.getElementById("startDate").value;
        let startTime = document.getElementById("startTime").value;
        let endDate = document.getElementById("endDate").value;
        let endTime = document.getElementById("endTime").value;

        if (!startDate || !startTime || !endDate || !endTime) {
            alertBox.innerHTML = "All fields must be filled!";
            alertBox.style.color = "red";
            return;
        }

        const startDateTime = new Date(`${startDate}T${startTime}:00`);
        const endDateTime = new Date(`${endDate}T${endTime}:00`);

        if ( startDateTime >= endDateTime ) {
            alertBox.innerHTML = "End time must be later than start time!";
            alertBox.style.color = "red";
            return;
        }

        const timeDifference = Math.floor((endDateTime - startDateTime) / 1000);

        resultBox.value = timeDifference + " seconds";
    });
}

Controller_TimeConverter();
