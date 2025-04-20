function Interface_TempConverter() {
    const windowBody = document.querySelector("#Window-Body-9");
    if (!windowBody) return;

    windowBody.innerHTML = `
        <h3>Fahrenheit (°F) ↔ Celsius (°C)</h3>

        <div class="temperature-converter">
            <label for="fahrenheitField">°F:</label>
            <input type="number" id="fahrenheitField" oninput="Controller_TempConverter('fahrenheit')">
            <div class="arrow">⇅</div>
            <label for="celsiusField">°C:</label>
            <input type="number" id="celsiusField" oninput="Controller_TempConverter('celsius')">
        </div>

        <p>Enter a temperature in either box to convert.</p>
    `;
}

Interface_TempConverter();
