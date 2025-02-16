function Controller_TempConverter( number ) {

    const fahrenheitInput = document.getElementById('fahrenheitField');
    const celsiusInput = document.getElementById('celsiusField');

    if ( number === 'fahrenheit' ) {
        const fahrenheit = parseFloat(fahrenheitInput.value);
        
        // Perform the conversion and update the Celsius field
        const celsius = (fahrenheit - 32) * 5 / 9;
        celsiusInput.value = celsius.toFixed(2);

    } 
    else if ( number === 'celsius' ) {
        const celsius = parseFloat(celsiusInput.value);
        
        // Perform the conversion and update the Fahrenheit field
        const fahrenheit = (celsius * 9 / 5) + 32;
        fahrenheitInput.value = fahrenheit.toFixed(2);
    }
}
