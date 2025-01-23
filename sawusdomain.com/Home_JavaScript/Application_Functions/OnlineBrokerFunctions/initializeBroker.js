async function initializeBroker() {


    try {
        // Fetch all data from the database
        const cryptoData = await getCryptoData();
        console.log("Fetched crypto data:", cryptoData);

        // Extract distinct currency names
        const distinctNames = [...new Set(cryptoData.map(data => data.currency_id))];
        console.log("Distinct currency names:", distinctNames);

        // Set up the currency menu
        setCurrencyMenu(distinctNames);

        // Add event listeners for menu interactions
        const currencyMenu = document.getElementById("currency-menu");
        const strategyMenu = document.getElementById("strategy-menu");

        if (currencyMenu && strategyMenu) {
            addEventListener_CurrencyMenu(currencyMenu, cryptoData);
            addEventListener_StrategyMenu(strategyMenu);
        } 
        else {
            console.error("Currency menu or strategy menu not found.");
        }

    } 
    catch (error) {
        console.error("Error initializing broker:", error);
    }

}

// Run initializeBroker on page load
document.addEventListener("DOMContentLoaded", initializeBroker);
