function addEventListenerSubmitLogIn(user_object) {

    const loginForm = document.getElementById('login_form');

    loginForm.addEventListener('submit', function(event) {

        event.preventDefault();

        const username_string = document.getElementById('username_field').value;
        const password_string = document.getElementById('password_field').value;

        user_object.loginMethod(username_string, password_string);

    });

    console.log('Added event listener to login button.');
}
