console.log("ViewCounter.js loaded");

async function updateViewCounter() {

  const response = await fetch('https://sawusdomain.com/Home_PHP/add.php');

  const text = await response.text();
}
updateViewCounter();



