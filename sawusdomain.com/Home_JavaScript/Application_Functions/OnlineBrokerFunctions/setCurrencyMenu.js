function setCurrencyMenu(distinctNames) {
    const currencyMenu = document.getElementById("currency-menu");


    currencyMenu.innerHTML = "";

    // add default option
    const defaultOption = document.createElement("option");
    defaultOption.textContent = "Select a currency";
    defaultOption.value = "";
    defaultOption.disabled = true;
    defaultOption.selected = true;

    currencyMenu.appendChild( defaultOption );

    // add options for distinct names
    distinctNames.forEach(name => {
        const option = document.createElement("option");
        option.textContent = name;
        option.value = name;
        currencyMenu.appendChild(option);
    });

    console.log("Currency menu populated successfully.");
}
