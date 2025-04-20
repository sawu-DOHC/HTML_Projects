async function Interface_CoingeckoApp() {
    
    const windowBody = document.querySelector("#Window-Body-12");
    if (!windowBody) return;

    windowBody.innerHTML = `
        <h1 id="title-1">Divergence Calculator</h1>
        <h1 id="title-1">Online Broker</h1>
        <h1 id="title-2">Get Rich For Free App!</h1>

        <select id="currency-menu">
            <option value="" disabled selected>Select a currency</option>
            <option value="bitcoin">Bitcoin</option>
            <option value="ethereum">Ethereum</option>
            <option value="dogecoin">Dogecoin</option>
        </select>

        <select id="strategy-menu" disabled>
            <option value="" disabled selected>Select a strategy</option>
            <option value="wolf">Wolf</option>
            <option value="normie">Normie</option>
        </select>

        <div>Long-Term Average: $<span id="long-term-stat"></span></div>
        <div>Short-Term Average: $<span id="short-term-stat"></span></div>

        <div class="light-housing">
            <div id="signal-green" class="signal"></div>
            <div id="signal-yellow" class="signal"></div>
            <div id="signal-red" class="signal"></div>
        </div>

        <p id="message-text"></p>
        <textarea id="text-box" readonly></textarea>
    `;
}

Interface_CoingeckoApp();
