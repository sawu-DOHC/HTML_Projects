function restrictViewMethod(user_object) {
    
    const deleteButton = document.getElementById('deleteButton');
    const saveButton = document.getElementById('saveButton');


    if (user_object.permissions_string !== 'admin' && user_object.permissions_string !== 'editor') {

        deleteButton.disabled = true;
        saveButton.disabled = true;

        // Apply styles to indicate the buttons are disabled
        deleteButton.style.backgroundColor = 'grey';
        deleteButton.style.cursor = 'not-allowed';
        saveButton.style.backgroundColor = 'grey';
        saveButton.style.cursor = 'not-allowed';
    }

    const userRole = user_object.permissions_string;

    document.querySelectorAll('[data-role]').forEach(function(element) {
        const roles = element.getAttribute('data-role').split(',');
        if (!roles.includes(userRole)) {
            element.style.display = 'none';
        }
    });

    if (userRole !== 'admin') {
        document.querySelectorAll('.admin-group').forEach(function(column) {
            column.style.display = 'none';
        });
    }

    
}