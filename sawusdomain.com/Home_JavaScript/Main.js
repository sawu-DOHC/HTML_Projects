async function Main() {

    let srcObj_Array;

    const useLocalData = false;


    if ( useLocalData == true ) {

        srcObj_Array = createSrcObjectsLocal(SrcObj_Array);

    } 
    else {

        try {
            const jsonData = await fetchJson(); // Make sure fetchJson is defined to fetch your data
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
