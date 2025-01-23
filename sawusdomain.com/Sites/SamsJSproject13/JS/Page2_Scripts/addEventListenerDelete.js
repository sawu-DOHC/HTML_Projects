function addEventListenerDelete(user_Object, id_Int) {

    var deleteButton_Element = document.getElementById('deleteButton');


    deleteButton_Element.addEventListener('click', async function(event_Object) {

        event_Object.preventDefault();
        

        var confirmDelete_Boolean = confirm('Are you sure you want to delete this entry?');

        if (confirmDelete_Boolean == true) {
            
            try {
         
                const response_Object = await fetch(`/Sites/SamsJSproject13/PHP/Page2_Scripts/DeleteHiringPartner.php?id=${id_Int}`, {
                    method: 'DELETE', 
                });


                const data_Object = await response_Object.json();

                if (data_Object.status === 'error') {

                    alert('Error deleting data: ' + data_Object.message);
                } 
                else if (data_Object.status === 'success') {

                    alert('Data deleted successfully!');
                    window.location.href = '/Sites/SamsJSproject13/HTML/page1_ViewTable.html';
                }
            } 
            catch (error_Object) {

                console.error('Error deleting data:', error_Object);
                alert('Error deleting data: ' + error_Object.message);
            }
        }
    });
}
