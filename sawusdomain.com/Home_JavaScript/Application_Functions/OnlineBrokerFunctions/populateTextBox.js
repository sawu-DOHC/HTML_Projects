function populateTextBox(selectedName, filteredData) {
    
    const textBox = document.getElementById("text-box");
    if (!textBox) {
        console.error("Text box not found.");
        return;
    }

    textBox.value = "";

    for (let i = filteredData.length - 1; i >= 0; i--) {
        const data = filteredData[i]; 
        const timestamp = `${data.timestamp}`.padEnd(20);
        const price = `$${parseFloat(data.price).toFixed(2)}`.padEnd(20);
    
        const entry = `${timestamp} ${price}\n`;
        textBox.value += entry;
    }
    
    

    console.log("Text box populated successfully.");
}
