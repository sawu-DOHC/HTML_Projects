function responseCheckMethod(data_Object) {
    
    if (data_Object.status === 'success') {
        return data_Object.data; // Assuming the data is in a 'data' field when success
    } 
    else if (data_Object.status === 'error') {
        console.error('Error fetching data:', data_Object.message);
        return [];
    }
}
