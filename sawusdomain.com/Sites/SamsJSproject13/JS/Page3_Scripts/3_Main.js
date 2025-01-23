const user_Object = new UserClass();

document.addEventListener('DOMContentLoaded', async function() {

    const isSessionValid_boolean = await user_Object.fetchSessionDataMethod();

    if (isSessionValid_boolean == true) {

        addEventListenerInsert();
        addEventListenerLogOut(user_Object);
    } 
    else {

        window.location.href = '/Sites/SamsJSproject13/HTML/page0_ViewLogin.html';

    }
    
});
