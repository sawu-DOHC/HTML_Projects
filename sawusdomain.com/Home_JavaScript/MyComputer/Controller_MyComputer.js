async function Controller_MyComputer() {

    const counterDiv = document.querySelector("#counter");

    try {

        const response = await fetch('Home_PHP/get.php');
        if ( response.status != 200 ) {
            throw new Error('Network response was not ok');
        }

        const data = await response.text();

        counterDiv.textContent = data; 
        
    } 
    catch ( error ) {
        console.error('Controller_MyComputer(): ', error );
    }
}

Controller_MyComputer();
