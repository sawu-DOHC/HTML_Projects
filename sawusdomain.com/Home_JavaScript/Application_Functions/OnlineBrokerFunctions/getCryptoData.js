async function getCryptoData() {
    
    try {
        const query = "SELECT * FROM crypto_data ORDER BY timestamp ASC;";
        const dataResult = await executeQuery(query);

        return dataResult.data;
    } 
    catch (error) {
        console.error("Error fetching crypto data:", error);
        return [];
    }
}
