function addEventListenerLogOut(user_object) {

    const logoutButton = document.getElementById('logout_button');

    logoutButton.addEventListener('click', function() {

        user_object.logoutMethod();

    });
    
}
