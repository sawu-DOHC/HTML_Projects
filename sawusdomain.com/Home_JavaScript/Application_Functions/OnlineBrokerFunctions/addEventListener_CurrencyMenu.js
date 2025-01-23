function addEventListener_CurrencyMenu( currencyMenu, cryptoDataArray ) {
    if (!cryptoDataArray || cryptoDataArray.length === 0) {
        console.error("Crypto data array is empty or undefined.");
        return;
    }

    currencyMenu.addEventListener("change", function () {

        const selectedName = currencyMenu.value;
        console.log("Selected currency from menu:", selectedName);

        // Filter the data for the selected cryptocurrency
        const filteredData = cryptoDataArray.filter(data => 
            data.currency_id.trim().toLowerCase() === selectedName.trim().toLowerCase()
        );

        if (filteredData.length === 0) {
            console.error(`No data found for the selected cryptocurrency: ${selectedName}`);
            console.log("Available data for filtering:", cryptoDataArray);
            return;
        }


        // Enable strategy menu and perform additional logic
        const strategyMenu = document.getElementById("strategy-menu");
        if (strategyMenu) {
            strategyMenu.disabled = false;
        }

        populateTextBox( selectedName, filteredData );

        // Calculate and update averages
        const lta = calculateLTA(filteredData);
        const sta = calculateSTA(filteredData);
        document.getElementById("long-term-stat").textContent = lta;
        document.getElementById("short-term-stat").textContent = sta;

        // Handle strategy-dependent logic
        if (strategyMenu && strategyMenu.value) {
            setLight(lta, sta, strategyMenu.value);
        }
    });
}
