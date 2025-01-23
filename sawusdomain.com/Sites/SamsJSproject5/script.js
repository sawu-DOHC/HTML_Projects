// declaring string arrays to store equations
equationsArray = [
    "5 + 2x = 25",
    "30 - 5x = 10",
    "6 + 3x = -12",
    "44 - 12x = -16",
    "48 + 6x = 6"
];

answersArray = [
    "10",
    "4",
    "-6",
    "-5",
    "-7"
];



// function to populate the equations table
function populateTableWithEquations() {

    const eqationTable = document.getElementById( "equationsTable" );


    for (let i = 0; i < equationsArray.length; i++) {
       
        let row = equationsTable.insertRow();

        // first column
        let cell1 = row.insertCell(0);
        cell1.textContent = `${i + 1})`;

        // second column
        let cell2 = row.insertCell(1);
        cell2.textContent = equationsArray[i];

        // third column
        let cell3 = row.insertCell(2);
        cell3.textContent = "x=";

        // fourth column
        let cell4 = row.insertCell(3);


        inputField = document.createElement("input");
        inputField.type = "text";
        
        cell4.appendChild( inputField );
    }
}

// call the function to populate the table
populateTableWithEquations();


///////////////////////////////////////////////////////////////////////////////

// get the start quiz button element
startQuizButton = document.getElementById( "startQuizButton" );
timeDisplay = document.getElementById( "timeDisplay" );
const inputFields = document.querySelectorAll("#equationsTable input[type='text']");

// function to check answers
function checkAnswers() {

    answerInputs = document.querySelectorAll( "input[type='text']" );

    answerInputs.forEach(function(input, index) {

        // check if the input value matches the answer

        if (input.value !== answersArray[index]) {
            // if not, set background color to red and text color to white
            input.style.backgroundColor = "red";
            input.style.color = "white";
        } 
        else {
            // if it matches, set background color to white and text color to black
            input.style.backgroundColor = "white";
        }
    });
}

// function to start the timer
function startTimer() {
    clearUserInputs();

    let seconds = 60;

    function updateTimerDisplay() {

        timeDisplay.textContent = seconds;

        // Decrement the time by 1 second
        seconds--;
    
        // If the timer reaches 0, stop the countdown
        if (seconds < 0) {
            clearInterval( timerInterval ); 
            timeDisplay.textContent = "00";
            checkAnswers(); 
        }
    }

    updateTimerDisplay();

    const timerInterval = setInterval( updateTimerDisplay, 100 ); // fast 30 seconds for easy testing
}

function clearTable() {
    const table = document.getElementById("equationsTable");
    table.innerHTML = ""; // Remove all child elements
}


// event listener to start quiz countdown
startQuizButton.addEventListener( "click", function() {
    
    startTimer();
    

});

function clearUserInputs() {
   // Iterate over each input field and set its value to an empty string
    inputFields.forEach(
        function(input) {
        input.value = "";
        input.style.backgroundColor = "white";
        input.style.color = "black";

    });
}