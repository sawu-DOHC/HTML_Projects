function setupTooltips() {
  
    document.body.addEventListener('mouseenter', showTooltip, true); 
    document.body.addEventListener('mouseleave', hideTooltip, true); 

}

function showTooltip( event ) {
   
    if ( event.target.tagName === 'IMG' && event.target.closest('.icon') ) {

        const icon = event.target;
        const iconId = icon.closest('.icon').id.match(/\d+$/); 
        
        const srcObj = SrcObj_Array.find(obj => obj.id === parseInt(iconId[0])); 
        
        const tooltip = document.getElementById('tooltip');
        tooltip.innerHTML = srcObj.description;  
        tooltip.style.display = 'block'
        tooltip.style.left = `${event.clientX + 20}px`;
        tooltip.style.top = `${event.clientY - 20}px`; 
        
        
    }
}

function hideTooltip( event ) {

    if (event.target.tagName === 'IMG' && event.target.closest('.icon')) {
        const tooltip = document.getElementById('tooltip');
        tooltip.style.display = 'none'; // Hide the tooltip
    }
}

document.addEventListener('DOMContentLoaded', setupTooltips);


