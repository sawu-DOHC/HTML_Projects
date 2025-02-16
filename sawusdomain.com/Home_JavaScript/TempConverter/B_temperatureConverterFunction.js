function fahrenheitToCelsius() {

    var fahrenheitInput = document.getElementById("fahrenheitField");
    var celsiusInput = document.getElementById("celsiusField");

    if ( fahrenheitInput !== null && fahrenheitInput.value !== "" ) {

        var fahrenheit = parseFloat(fahrenheitInput.value);
        var celsius = (fahrenheit - 32) * 5 / 9;
        celsiusInput.value = celsius.toFixed(4);
        
    }
}

function celsiusToFahrenheit() {

    var fahrenheitInput = document.getElementById("fahrenheitField");
    var celsiusInput = document.getElementById("celsiusField");

    if ( celsiusInput !== null && celsiusInput.value !== "" ) {

        var celsius = parseFloat(celsiusInput.value);
        var fahrenheit = (celsius * 9 / 5) + 32;
        fahrenheitInput.value = fahrenheit.toFixed(4);

    }
}
