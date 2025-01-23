function calculateSTA(filteredData) {
    const shortTermPeriod = 90; // each entry is 1 day so this number represents days

    let total = 0; 

    const startIndex = filteredData.length - shortTermPeriod;


    for (let i = startIndex; i < filteredData.length; i++) {

        total = total + parseFloat(filteredData[i].price);
    }


    const average = total / shortTermPeriod;

    return average.toFixed(2);
}
