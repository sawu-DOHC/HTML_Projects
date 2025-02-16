function setupTooltips() {

    let tooltip = document.getElementById( 'tooltip' );

    tooltip = document.createElement( 'div' );
    tooltip.id = 'tooltip';
    document.body.appendChild( tooltip );

    document.body.addEventListener( 'mouseenter', showTooltip, true ); 
    document.body.addEventListener( 'mouseleave', hideTooltip, true );
} 

function showTooltip( event ) {

    if ( event.target.tagName === 'IMG' && event.target.closest('.icon') ) {
        
        const icon = event.target.closest( '.icon' ); 
        const iconId = icon.getAttribute( 'src_id' ); 


        const iconData = system.json_data.find( obj => obj.id === iconId );

    
        const tooltip = document.getElementById( 'tooltip' );
        tooltip.innerHTML = iconData.description; 
        tooltip.style.display = 'block';
        tooltip.style.left = `${event.clientX + 20}px`;  
        tooltip.style.top = `${event.clientY - 20}px`;
        
    }
}


function hideTooltip() {
    const tooltip = document.getElementById( 'tooltip' );
    tooltip.style.display = 'none';
}

document.addEventListener('DOMContentLoaded', setupTooltips);
