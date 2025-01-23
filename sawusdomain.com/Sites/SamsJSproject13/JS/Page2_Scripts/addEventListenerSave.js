function addEventListenerSave(user_Object, id_Int) {
    var submissionForm_Element = document.getElementById('submissionForm'); // get the submission form element

    submissionForm_Element.addEventListener('submit', async function(event_Object) {
        event_Object.preventDefault(); 

        var formData_Object = {

            id: id_Int, // include the ID from the query parameter
            partner_name: document.getElementById('partner_name').value,
            company_phone: document.getElementById('company_phone').value, // company phone
            street_address: document.getElementById('street_address').value, // street address
            city: document.getElementById('city').value,
            state: document.getElementById('state').value,
            zip: document.getElementById('zip').value,
            product_description: document.getElementById('product_description').value,
            contact_name: document.getElementById('contact_name').value,
            contact_title: document.getElementById('contact_title').value,
            contact_phone: document.getElementById('contact_phone').value,
            contact_email: document.getElementById('contact_email').value,
            pay_rate: parseFloat(document.getElementById('pay_rate').value), // ensure decimal
            fullTime: document.getElementById('fullTime').checked ? 1 : 0,
            partTime: document.getElementById('partTime').checked ? 1 : 0,
            medical: document.getElementById('medical').checked ? 1 : 0,
            dental: document.getElementById('dental').checked ? 1 : 0,
            retirement: document.getElementById('retirement').checked ? 1 : 0,
            paidTimeOff: document.getElementById('paidTimeOff').checked ? 1 : 0,
            tig: document.getElementById('tig').checked ? 1 : 0,
            spray_transfer: document.getElementById('spray_transfer').checked ? 1 : 0,
            short_circuit: document.getElementById('short_circuit').checked ? 1 : 0,
            flux_core: document.getElementById('flux_core').checked ? 1 : 0,
            stick: document.getElementById('stick').checked ? 1 : 0,
            other: document.getElementById('other').checked ? 1 : 0,
            firstShift: document.getElementById('firstShift').checked ? 1 : 0,
            secondShift: document.getElementById('secondShift').checked ? 1 : 0,
            thirdShift: document.getElementById('thirdShift').checked ? 1 : 0,
            weldTest_description: document.getElementById('weldTest_description').value,
            notes: document.getElementById('notes').value
        };

        try {
            var response_Object = await fetch('/Sites/SamsJSproject13/PHP/Page2_Scripts/UpdateHiringPartner.php', { // send a POST request to the server with the form data
                method: 'POST', // specify the HTTP method as POST
                headers: {
                    'Content-Type': 'application/json' // specify the content type as JSON
                },
                body: JSON.stringify(formData_Object) // convert the form data to a JSON string
            });

            var responseText_String = await response_Object.text(); // read the response as text
            console.log('Server response:', responseText_String); // log the server response
            var data_Object = JSON.parse(responseText_String); // parse the response as JSON

            if (data_Object.status === 'success') {
                alert(data_Object.message); // display a success message
                window.location.href = '/Sites/SamsJSproject13/HTML/page1_ViewTable.html'; // redirect to the table view page
            } 
            else if (data_Object.status === 'error') {
                alert('Error: ' + data_Object.message); // display an error message
            }

        } 
        
        catch (error_Object) {
            console.error('Error updating data:', error_Object); // log any errors that occur
            alert('Error updating data.'); // display a generic error message
        }
    });
}
