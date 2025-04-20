function setupTooltips() {

    let tooltip = document.getElementById('tooltip');

    if (!tooltip) {
        //console.log("Creating tooltip element...");
        tooltip = document.createElement('div');
        tooltip.id = 'tooltip';
        document.body.appendChild(tooltip);
    } 
    else {
        //console.log("Tooltip element already exists.");
    }

    document.body.addEventListener('mouseenter', showTooltip, true);
    document.body.addEventListener('mouseleave', hideTooltip, true);
}

function showTooltip( event ) {
    if ( event.target.tagName === 'IMG' && event.target.closest('.icon') ) {
        const icon = event.target.closest('.icon');
        const iconId = icon.getAttribute('src_id');
        
        //console.log("Hovered icon with src_id:", iconId);


        if (!system.json_data) {
           //console.error("Error: system.json_data is not available.");
            return;
        }

        const iconData = system.json_data.find(obj => obj.id === iconId);

        if (!iconData) {
            console.error(`Error: No data found for icon with id ${iconId}.`);
            return;
        }


        //console.log("Icon data found:", iconData);

        const tooltip = document.getElementById('tooltip');
        
        if (!tooltip) {
            console.error("Error: Tooltip element not found.");
            return;
        }

        tooltip.innerHTML = iconData.description; 
        tooltip.style.display = 'block';

     
        //console.log("Setting tooltip position:", event.clientX + 20, event.clientY - 20);

        tooltip.style.left = `${event.clientX + 20}px`;
        tooltip.style.top = `${event.clientY - 20}px`;
    } 
    else {
        //console.log("Hovered element is not an image inside .icon.");
    }
}

function hideTooltip() {
    const tooltip = document.getElementById('tooltip');

    if ( tooltip ) {
        tooltip.style.display = 'none';
        //console.log("Hiding tooltip.");
    } 
    else {
        //console.error("Error: Tooltip element not found while hiding.");
    }
}

setupTooltips();
