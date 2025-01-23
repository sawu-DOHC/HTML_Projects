function addEventListener_StrategyMenu(strategyMenu_element) {
    strategyMenu_element.addEventListener("change", function () {
        // Get the selected strategy
        var selectedStrategy = strategyMenu_element.value;

        // Retrieve the long-term and short-term average values
        var lta = parseFloat(document.getElementById("long-term-stat").textContent);
        var sta = parseFloat(document.getElementById("short-term-stat").textContent);

        // Set the appropriate traffic signal light
        setLight(lta, sta, selectedStrategy);
    });
}
