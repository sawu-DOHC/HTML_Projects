document.addEventListener("DOMContentLoaded", function () {

    async function get() {

        try {

            const response = await fetch('Home_PHP/add.php'); 
            const data = await response.text(); 

        } 
        catch (error) {
            console.log("myComputer get error")
        }
    }

    async function set() {

        try {
            const response = await fetch('Home_PHP/get.php'); 
            const data = await response.text();
            const vcElement = document.getElementById("vc");
            vcElement.textContent = `${data}`; 
        } 
        catch (error) {
            console.error('myComputer set', error); 
        }
    }

    get();
    set();
});
