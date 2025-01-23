function addEventListenerInsert() {

    document.getElementById('submissionForm').addEventListener('submit', async function(event) {

        event.preventDefault(); // prevent the default form submission behavior

        // serialize the form data into a FormData object
        const formData = new FormData(this);

        try {
            // send the form data to the server using the Fetch API
            const response = await fetch('/Sites/SamsJSproject13/PHP/Page3_Scripts/InsertHiringPartner.php', {
                method: 'POST',
                body: formData
            });

            // parse the JSON response from the server
            const responseData = await response.json();

            // check if the response indicates success
            if (responseData.status === 'success') {
                alert(responseData.message); // show a success message
                document.getElementById('submissionForm').reset(); // reset the form fields
                window.location.href = '/Sites/SamsJSproject13/HTML/page1_ViewTable.html'; // redirect to the table view page
            } 
            else {
                alert('Error: ' + responseData.message); // show an error message if the server returned an error
            }
        } 
        
        catch (error) {
            console.error('Error:', error); // log any errors that occurred during the fetch
            alert('Error: ' + error.message); // show an error message
        }
    });
}
