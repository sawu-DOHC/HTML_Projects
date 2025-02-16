function Controller_TimeConverter() {
    // Get the input values
    const startDate = document.getElementById('startDate').value;
    const startTime = document.getElementById('startTime').value;
    const endDate = document.getElementById('endDate').value;
    const endTime = document.getElementById('endTime').value;

    // Check if all fields are filled
    if (!startDate || !startTime || !endDate || !endTime) {
        const alertBox = document.getElementById('alertBox');
        alertBox.innerHTML = 'All fields must be filled!';
        alertBox.style.color = 'red';
        return;
    }


    const startDateTime = new Date(`${startDate}T${startTime}:00`);
    const endDateTime = new Date(`${endDate}T${endTime}:00`);


    const timeDifference = endDateTime - startDateTime;

    
    if (timeDifference < 0) {
        const alertBox = document.getElementById('alertBox');
        alertBox.innerHTML = 'End time must be later than start time!';
        alertBox.style.color = 'red';
        return;
    }

    // Convert milliseconds to seconds
    const secondsDifference = Math.floor(timeDifference / 1000);

    // Display the result
    document.getElementById('resultBox').value = secondsDifference;

}
