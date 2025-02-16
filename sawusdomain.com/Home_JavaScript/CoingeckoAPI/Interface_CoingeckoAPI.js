async function Interface_CoingeckoAPI() {
    const windowBody = document.querySelector("#Window-Body-12"); 

    windowBody.innerHTML = '';  
    // title section
    const title1 = document.createElement('h1');
    title1.id = 'title-1';
    title1.textContent = 'Divergence Calculator';
    windowBody.appendChild(title1);

    const title2 = document.createElement('h1');
    title2.id = 'title-1';
    title2.textContent = 'Online Broker';
    windowBody.appendChild(title2);

    const title3 = document.createElement('h1');
    title3.id = 'title-2';
    title3.textContent = 'Get Rich For Free App!';
    windowBody.appendChild(title3);

    // currency menu
    const currencyMenu = document.createElement('select');
    currencyMenu.id = 'currency-menu';
    const currencyPlaceholder = document.createElement('option');
    currencyPlaceholder.value = '';
    currencyPlaceholder.disabled = true;
    currencyPlaceholder.selected = true;
    currencyPlaceholder.textContent = 'Select a currency';
    currencyMenu.appendChild(currencyPlaceholder);

    const currencies = ['bitcoin', 'ethereum', 'dogecoin']; 
    currencies.forEach(currency => {
        const option = document.createElement('option');
        option.value = currency;
        option.textContent = currency.charAt(0).toUpperCase() + currency.slice(1);
        currencyMenu.appendChild(option);
    });

    windowBody.appendChild(currencyMenu);

    // strategy menu
    const strategyMenu = document.createElement('select');
    strategyMenu.id = 'strategy-menu';
    strategyMenu.disabled = true;  
    const strategyPlaceholder = document.createElement('option');
    strategyPlaceholder.value = '';
    strategyPlaceholder.disabled = true;
    strategyPlaceholder.selected = true;
    strategyPlaceholder.textContent = 'Select a strategy';
    strategyMenu.appendChild(strategyPlaceholder);

    const strategies = ['wolf', 'normie'];
    strategies.forEach(strategy => {
        const option = document.createElement('option');
        option.value = strategy;
        option.textContent = strategy.charAt(0).toUpperCase() + strategy.slice(1);
        strategyMenu.appendChild(option);
    });

    windowBody.appendChild(strategyMenu);

    // averages and signal section
    const longTermStatDiv = document.createElement('div');
    longTermStatDiv.innerHTML = `Long-Term Average: $<span id="long-term-stat"></span>`;
    windowBody.appendChild(longTermStatDiv);

    const shortTermStatDiv = document.createElement('div');
    shortTermStatDiv.innerHTML = `Short-Term Average: $<span id="short-term-stat"></span>`;
    windowBody.appendChild(shortTermStatDiv);

    const lightHousingDiv = document.createElement('div');
    lightHousingDiv.className = 'light-housing';

    const greenSignal = document.createElement('div');
    greenSignal.id = 'signal-green';
    greenSignal.className = 'signal';
    const yellowSignal = document.createElement('div');
    yellowSignal.id = 'signal-yellow';
    yellowSignal.className = 'signal';
    const redSignal = document.createElement('div');
    redSignal.id = 'signal-red';
    redSignal.className = 'signal';

    lightHousingDiv.appendChild(greenSignal);
    lightHousingDiv.appendChild(yellowSignal);
    lightHousingDiv.appendChild(redSignal);

    windowBody.appendChild(lightHousingDiv);

    const messageText = document.createElement('p');
    messageText.id = 'message-text';
    windowBody.appendChild(messageText);

    const textBox = document.createElement('textarea');
    textBox.id = 'text-box';
    textBox.setAttribute('readonly', true);  
    windowBody.appendChild(textBox);
}

Interface_CoingeckoAPI();
