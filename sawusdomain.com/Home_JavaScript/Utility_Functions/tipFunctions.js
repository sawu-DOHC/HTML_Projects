function setupTooltips() {
    document.body.addEventListener('mouseenter', showTooltip, true); 
    document.body.addEventListener('mouseleave', hideTooltip, true); 
}

function showTooltip(event) {
    if (event.target.tagName === 'IMG' && event.target.closest('.icon')) {
        const icon = event.target;
        const iconId = icon.closest('.icon').id.match(/\d+$/)[0]; // Get the first match directly
        console.log("Parsed Icon ID:", iconId); // Check what ID is being parsed

        // Ensure you compare the same type, assuming `string_id` is a string
        const srcObj = srcObj_Array.find(obj => obj.string_id === iconId); // Use '===' for strict comparison
        console.log("Found SrcObj:", srcObj); // Verify the right object is found

        if (srcObj) {
            const tooltip = document.getElementById('tooltip');
            tooltip.innerHTML = srcObj.string_description; // Ensure you use the correct property for description
            tooltip.style.display = 'block';
            tooltip.style.left = `${event.clientX + 20}px`;
            tooltip.style.top = `${event.clientY - 20}px`;
        }
    }
}

function hideTooltip(event) {
    if (event.target.tagName === 'IMG' && event.target.closest('.icon')) {
        const tooltip = document.getElementById('tooltip');
        tooltip.style.display = 'none';
    }
}

document.addEventListener('DOMContentLoaded', setupTooltips);
