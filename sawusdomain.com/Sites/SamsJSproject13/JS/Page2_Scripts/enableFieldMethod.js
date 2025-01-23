function enableFieldMethod(fieldId) {

    const element = document.getElementById(fieldId);

    if (element) {
        element.disabled = false;
    } 
    else {
        console.error(`Element with ID ${fieldId} not found`);
    }
    
}
