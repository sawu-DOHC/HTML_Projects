function addEventListenerSort(user_Object) {

    var headers_NodeList = document.querySelectorAll("th.sortable");

    for (var i = 0; i < headers_NodeList.length; i++) {

        var header_Node = headers_NodeList[i];

        header_Node.style.cursor = 'pointer';

        header_Node.removeEventListener('click', sortEventHandler);

        header_Node.addEventListener('click', sortEventHandler);

    }

    async function sortEventHandler(event_Object) {
        var sortColumn_String = this.dataset.column;
        var currentOrder_String = this.dataset.order;
        var newOrder_String;

        if (currentOrder_String === 'ASC') {
            newOrder_String = 'DESC';
        } 
        else {
            newOrder_String = 'ASC';
        }

        this.dataset.order = newOrder_String;
        console.log("Sorting by " + sortColumn_String + " in " + newOrder_String + " order");


        try {
            const data_Array = await fetchDataMethod(sortColumn_String, newOrder_String);
            populateTableMethod(user_Object, data_Array);
            addEventListenerSelection();
        } 
        catch (error) {
            console.error('Error fetching data:', error);
        }
    }
}
