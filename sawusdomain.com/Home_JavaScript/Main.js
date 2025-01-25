let srcObj_Array = []; // Global array

async function Main() {

    const useLocalData = false;

    if (useLocalData == true) {

        srcObj_Array = createSrcObjectsLocal(local_array);
    } 
    else {
        try {
            const jsonData = await fetchJson(); // Fetch your data
            srcObj_Array = createSrcObjectsApi(jsonData);
            console.log("Fetched and processed JSON Data:", srcObj_Array);
        } 
        catch (error) {
            console.error("Failed to fetch JSON Data:", error);
            return; // Exit if fetch fails
        }
    }

    populateDiv(desktop, srcObj_Array, 0);
    initializeBroker();                                                          
}

Main();
