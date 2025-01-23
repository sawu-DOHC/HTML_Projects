async function fetchDataMethod(sortColumn_String, sortOrder_String) {
    
    try {
        const response_Object = await fetch(`/Sites/SamsJSproject13/PHP/Page1_Scripts/QueryHiringPartnersTable.php?sort=${sortColumn_String}&order=${sortOrder_String}`);
        const data_Object = await response_Object.json();

        if (data_Object.status === 'success') {
            return data_Object.data; 
        } 
        else if (data_Object.status === 'error') {
            console.error('Error fetching data:', data_Object.message);
            return [];
        }
    } 
    catch (error_Object) {
        console.error('Error fetching data:', error_Object);
        return [];
    }
}
