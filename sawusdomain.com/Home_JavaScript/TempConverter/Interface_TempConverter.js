function Interface_TempConverter() {
    const windowBody = document.querySelector("#Window-Body-9");  
    //console.log("Selected window-body: ", windowBody);


    windowBody.innerHTML = '';  


    const title = document.createElement('h3');
    title.textContent = 'Fahrenheit (°F) ↔ Celsius (°C)';
    windowBody.appendChild(title);


    const converterDiv = document.createElement('div');
    converterDiv.className = 'temperature-converter';


    const fahrenheitLabel = document.createElement('label');
    fahrenheitLabel.setAttribute('for', 'fahrenheitField');
    fahrenheitLabel.textContent = '°F:';
    converterDiv.appendChild(fahrenheitLabel);

    const fahrenheitInput = document.createElement('input');
    fahrenheitInput.type = 'number';
    fahrenheitInput.id = 'fahrenheitField';
    fahrenheitInput.oninput = () => Controller_TempConverter('fahrenheit');
    converterDiv.appendChild(fahrenheitInput);


    const arrow = document.createElement('div');
    arrow.className = 'arrow';
    arrow.textContent = '⇅';
    converterDiv.appendChild(arrow);


    const celsiusLabel = document.createElement('label');
    celsiusLabel.setAttribute('for', 'celsiusField');
    celsiusLabel.textContent = '°C:';
    converterDiv.appendChild( celsiusLabel );

    const celsiusInput = document.createElement('input');
    celsiusInput.type = 'number';
    celsiusInput.id = 'celsiusField';
    celsiusInput.oninput = () => Controller_TempConverter('celsius');
    converterDiv.appendChild( celsiusInput );


    windowBody.appendChild(converterDiv);

    const explanation = document.createElement('p');
    explanation.textContent = 'Enter a temperature in either box to convert.';
    windowBody.appendChild(explanation);
}

Interface_TempConverter();