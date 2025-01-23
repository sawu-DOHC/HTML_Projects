function enableGroupMethod(groupName) {

    const groupElements = document.querySelectorAll(`[name="${groupName}[]"]`);

    groupElements.forEach(element => {
        element.disabled = false;
    });
    
}
