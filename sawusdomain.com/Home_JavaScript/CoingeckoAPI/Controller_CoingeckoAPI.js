async function Controller_CoingeckoAPI() {

    const currencyMenu = document.getElementById('currency-menu');
    const strategyMenu = document.getElementById('strategy-menu');


    const cryptoData = await getCryptoData();  


    currencyMenu.addEventListener("change", async function() {
        const selectedName = currencyMenu.value;
        
        if (!selectedName) {
            console.error("No currency selected");
            return; // Exit early if no selection is made
        }

        console.log("Selected currency from menu:", selectedName);

        // Filter the data for the selected cryptocurrency
        const filteredData = cryptoData.filter(data =>
            data.currency_id.trim().toLowerCase() === selectedName.trim().toLowerCase()
        );

        if (filteredData.length === 0) {
            console.error(`No data found for the selected cryptocurrency: ${selectedName}`);
            return;
        }

        // Enable strategy menu
        strategyMenu.disabled = false;

        // Populate the text box with selected currency and filtered data
        populateTextBox(selectedName, filteredData);

        // Calculate and update long-term and short-term averages
        const lta = calculateLTA(filteredData);
        const sta = calculateSTA(filteredData);
        document.getElementById("long-term-stat").textContent = lta;
        document.getElementById("short-term-stat").textContent = sta;

        // Handle strategy-dependent logic (signal lights)
        if (strategyMenu.value) {
            setLight(lta, sta, strategyMenu.value);
        }
    });


    strategyMenu.addEventListener("change", function() {
        const selectedStrategy = strategyMenu.value;

        const lta = parseFloat(document.getElementById("long-term-stat").textContent);
        const sta = parseFloat(document.getElementById("short-term-stat").textContent);


        setLight(lta, sta, selectedStrategy);
    });

}

async function getCryptoData() {
    try {
        const query = "SELECT * FROM crypto_data ORDER BY timestamp ASC;";  // Sample query to fetch all data
        const dataResult = await executeQuery(query);
        return dataResult.data;
    } catch (error) {
        console.error("Error fetching crypto data:", error);
        return [];  // Return an empty array on error
    }
}
async function executeQuery(queryString) {
    const apiEndpoint = "https://sawusdomain.com/Home_PHP/key.php";  
    const query = JSON.stringify({ query: queryString });

    try {
        const response = await fetch(apiEndpoint, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: query
        });

        if (!response.ok) {
            throw new Error(`HTTP error ${response.status}: ${await response.text()}`);
        }

        const data = await response.json();
        if (!data || typeof data !== 'object' || !data.data) {
            console.error("Invalid response structure:", data);
            return { data: [] };
        }
        return data;
    } 
    catch (error) {
        console.error("Error in executeQuery:", error);
        return { data: [] };
    }
}
function populateTextBox(selectedName, filteredData) {
    const textBox = document.getElementById("text-box");
    if (!textBox) {
        console.error("Text box not found.");
        return;
    }

    textBox.value = "";  // Clear text box first
    // Populate the text box with filtered data (timestamp and price)
    for (let i = filteredData.length - 1; i >= 0; i--) {
        const data = filteredData[i];
        const timestamp = `${data.timestamp}`.padEnd(20);
        const price = `$${parseFloat(data.price).toFixed(2)}`.padEnd(20);
        const entry = `${timestamp} ${price}\n`;
        textBox.value += entry;
    }

    console.log("Text box populated successfully.");
}
function calculateLTA(filteredData) {
    let total = 0;
    for (let i = 0; i < filteredData.length; i++) {
        total += parseFloat(filteredData[i].price);
    }
    const average = total / filteredData.length;
    return average.toFixed(2);
}
function calculateSTA(filteredData) {
    const shortTermPeriod = 90; // 90 days
    let total = 0;
    const startIndex = filteredData.length - shortTermPeriod;

    for (let i = startIndex; i < filteredData.length; i++) {
        total += parseFloat(filteredData[i].price);
    }

    const average = total / shortTermPeriod;
    return average.toFixed(2);
}
function setLight(lta_number, sta_number, selectedStrategy_string) {
    const signalRed = document.getElementById("signal-red");
    const signalYellow = document.getElementById("signal-yellow");
    const signalGreen = document.getElementById("signal-green");
    const messageBox = document.getElementById("message-text");

    signalRed.classList.remove("active");
    signalYellow.classList.remove("active");
    signalGreen.classList.remove("active");

    let message = ""; // default message

    if (selectedStrategy_string === "wolf") {
        if (lta_number > sta_number) {
            signalGreen.classList.add("active");
            message = "Buy: Long term average is larger than the short term average, meaning everyone sold. It's time to fill your bag for cheap!";
        } else if (lta_number === sta_number) {
            signalYellow.classList.add("active");
            message = "Hold: Just wait.";
        } else {
            signalRed.classList.add("active");
            message = "Sell: Short term average is larger than long term average, meaning the price is peaking and due to come down.";
        }
    } else if (selectedStrategy_string === "normie") {
        if (lta_number > sta_number) {
            signalRed.classList.add("active");
            message = "Sell: Long term average is above short term average, meaning the price is plummeting. Get your money out!";
        } else if (lta_number === sta_number) {
            signalYellow.classList.add("active");
            message = "Hold: Just wait.";
        } else {
            signalGreen.classList.add("active");
            message = "Buy: Short term average is larger than long term average, meaning everyone is buying so you better do it too!";
        }
    } else {
        signalYellow.classList.add("active");
        message = "Hold: Default action - no strategy selected.";
    }

    messageBox.textContent = message;
}

Controller_CoingeckoAPI();
