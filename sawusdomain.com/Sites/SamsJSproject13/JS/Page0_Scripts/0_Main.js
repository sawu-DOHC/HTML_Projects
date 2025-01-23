const user_Object = new UserClass();

async function executeMain() {
    const isSessionValid_Boolean = await user_Object.fetchSessionDataMethod();

    if (isSessionValid_Boolean == true) {

        addEventListenerLogOut(user_Object);

        // Disable and style the buttons
        login_button.disabled = true;
        guest_login_button.disabled = true;

        login_button.style.backgroundColor = 'gray';
        guest_login_button.style.backgroundColor = 'gray';

        login_button.style.cursor = 'not-allowed';
        guest_login_button.style.cursor = 'not-allowed';

    } 
    else {
        
        logout_button.disabled = true;

        logout_button.style.backgroundColor = 'gray';

        logout_button.style.cursor = 'not-allowed';

        addEventListenerSubmitLogIn(user_Object);
        addEventListenerLogInAsGuest(user_Object);
    }
}

document.addEventListener('DOMContentLoaded', executeMain);
