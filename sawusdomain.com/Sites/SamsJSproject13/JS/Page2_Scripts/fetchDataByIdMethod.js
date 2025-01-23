async function fetchDataByIdMethod(id_Int) {

    try {
        const response_Object = await fetch(`/Sites/SamsJSproject13/PHP/Page2_Scripts/QueryHiringPartner.php?id=${id_Int}`);

        if (response_Object.ok == false) {
            throw new Error('Network response was not ok');
        }

        const data_Object = await response_Object.json();
        return data_Object;
        
    } 
    catch (error_Object) {

        console.error('Error fetching data:', error_Object);
        throw error_Object;
    }
}
