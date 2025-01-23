
function addEventListenerSelection() { 
    var tableBody_Element = document.getElementById("partners-data"); // get the table body element by its id

    var rowsElements_Array = tableBody_Element.querySelectorAll('tr'); // select all row elements within the table body

    for (var i = 0; i < rowsElements_Array.length; i++) { // iterate over each row element
        var row_Element = rowsElements_Array[i]; // get the current row element

        row_Element.addEventListener('click', function(event) { // add click event listener to highlight the row
            highlightRow(this, rowsElements_Array); // call highlightRow with the clicked row and rowsElements_Array
        });

        row_Element.addEventListener('dblclick', function(event) { // add double-click event listener to navigate to details page
            navigateToDetails(this); // call navigateToDetails with the clicked row
        });

        row_Element.addEventListener('touchstart', function(event) { // add touchstart event listener to handle long press
            handleTouchStart(this); // call handleTouchStart with the touched row
        });

        row_Element.addEventListener('touchend', function(event) { // add touchend event listener to clear long press timer
            handleTouchEnd(); // call handleTouchEnd to clear the long press timer
        });
    }
}

function highlightRow(clickedRow_Element, rowsElements_Array) { 
    for (var j = 0; j < rowsElements_Array.length; j++) { // remove highlight from any other row
        rowsElements_Array[j].classList.remove('highlighted-row'); // remove highlighted class from each row
    }
    clickedRow_Element.classList.add('highlighted-row'); // add highlight to the clicked row
}


function navigateToDetails(clickedRow_Element) { 
    var id_String = clickedRow_Element.getAttribute('data-id'); // get the data-id attribute from the clicked row
    window.location.href = '/Sites/SamsJSproject13/HTML/page2_ViewDetails.html?id=' + id_String; // navigate to the details page with the id
}

// MOBILE TOUCH FUNCTIONALITY  ///////////////

var touchStartTime_Integer; // variable to store the touch start time
var longPressDuration_Integer = 1500; // duration in milliseconds for a long press
var longPressTimer_Integer; // variable to store the long press timer


function recordTouchStartTime() {
    return new Date().getTime();
}


function setLongPressTimer(row_Element, duration) {
    return setTimeout(handleLongPressAction, duration, row_Element);
}


function handleLongPressAction(row_Element) {
    navigateToDetails(row_Element);
}


function handleTouchStart(row_Element) {
    touchStartTime_Integer = recordTouchStartTime(); // record the touch start time
    longPressTimer_Integer = setLongPressTimer(row_Element, longPressDuration_Integer); // set the long press timer
}


function handleTouchEnd() {
    clearTimeout(longPressTimer_Integer); // clear the long press timer
}


document.addEventListener('click', function(event) { 
    deselectHighlights(event); // call deselectHighlights on document click
});


function deselectHighlights(event_Object) { 
    if (!event_Object.target.closest('#partners-table')) { // check if the click is outside the table
        removeHighlights(); // call removeHighlights to remove the highlight from all rows
    }
}


function removeHighlights() { 
    var rowsElements_Array = document.querySelectorAll("#partners-data tr"); // select all row elements within the table body
    for (var q = 0; q < rowsElements_Array.length; q++) { // iterate over each row element
        rowsElements_Array[q].classList.remove('highlighted-row'); // remove the highlighted class from each row
    }
}
