async function populateMenu(cryptoNamesArray, menu) {

    

    for (let i = 0; i < cryptoNamesArray.length; i++) {
        const option = document.createElement("option");
        option.textContent = cryptoNamesArray[i];
        menu.appendChild(option);
    }
    
}
