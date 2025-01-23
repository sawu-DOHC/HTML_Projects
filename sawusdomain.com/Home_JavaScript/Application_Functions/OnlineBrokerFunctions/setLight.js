function setLight( lta_number, sta_number, selectedStrategy_string ) {
    
    const signalRed = document.getElementById("signal-red");
    const signalYellow = document.getElementById("signal-yellow");
    const signalGreen = document.getElementById("signal-green");
    const messageBox = document.getElementById("message-text");

    signalRed.classList.remove("active");
    signalYellow.classList.remove("active");
    signalGreen.classList.remove("active");

    let message = ""; // default message

    if (selectedStrategy_string === "wolf") {
        // "Wolf" strategy: buy if long-term average is higher than short-term
        if (lta_number > sta_number) { // current price low, old price high
            signalGreen.classList.add("active");
            message = "Buy: Long term average is larger than the short term average, meaning everyone sold. It's time to fill your bag for cheap! You do have money r-right?";
        } 
        else if (lta_number === sta_number) {
            signalYellow.classList.add("active");
            message = "Hold: Just wait.";
        } 
        else { // current price high, old price low
            signalRed.classList.add("active");
            message = "Sell: Short term average is larger than long term average, meaning the price is peaking and due to come down. ";
        }
    } 
    else if (selectedStrategy_string === "normie") {
        // "Sheep" strategy: sell if long-term average is higher than short-term
        if (lta_number > sta_number) { // current price low, old price high
            signalRed.classList.add("active");
            message = "Sell: Long term average is above short term average, meaning the price is plummeting. Get your money out, it's correcting!";
        } 
        else if (lta_number === sta_number) {
            signalYellow.classList.add("active");
            message = "Hold: Just wait.";
        } 
        else { // current price high, old price low
            signalGreen.classList.add("active");
            message = "Buy: Short term average is larger than long term average, meaning everyone is buying so you better do it too! You do want to be rich, right? Don't fall victim to FOMO.";
        }
    } 
    else {
        // Default case if no valid strategy is selected
        signalYellow.classList.add("active");
        message = "Hold: Default action - no strategy selected.";
    }

    // Update the message box
    messageBox.textContent = message;
}
