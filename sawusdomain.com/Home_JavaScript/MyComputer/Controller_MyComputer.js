async function Controller_MyComputer() {

    const counterDiv = document.querySelector("#counter");

    try {

        const response = await fetch('https://sawusdomain.com/Home_PHP/get.php');

        if ( response.status != 200 ) {
            throw new Error('Network response was not ok');
        }

        const data = await response.text();
        console.log("Controller_MyComputer.data", data );

        counterDiv.textContent = data; 
        
    } 
    catch ( error ) {
        console.error('Controller_MyComputer(): ', error );
    }


}

Controller_MyComputer();
