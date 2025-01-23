function calculateLTA( filteredData ) {
   
    
        let total = 0;

        for (let i = 0; i < filteredData.length; i++) {
            
            total = total + parseFloat(filteredData[i].price);
        }

      
        const average = total / filteredData.length;

    return average.toFixed(2);
    
}
