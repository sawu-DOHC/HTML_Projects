document.addEventListener("DOMContentLoaded", function () {

    async function add() {

        try {

            const response = await fetch('https://sawusdomain.com/Home_PHP/add.php'); 
            const data = await response.text(); 
            console.log("view counter updated, message from server: " + data );
        } 
        catch ( error ) {
            console.log("view counter not bussin ")
        }
    }

    add();



});
