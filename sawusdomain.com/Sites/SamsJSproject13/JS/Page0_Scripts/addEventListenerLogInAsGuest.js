function addEventListenerLogInAsGuest(user_object) {

    const guestLoginButton = document.getElementById('guest_login_button');

    guestLoginButton.addEventListener('click', function() {

        user_object.loginMethod('guest', 'guest');

    });

    console.log('Added event listener to guest login button');
}
