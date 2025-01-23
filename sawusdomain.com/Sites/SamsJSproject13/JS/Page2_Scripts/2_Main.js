const user_Object = new UserClass();

document.addEventListener('DOMContentLoaded', async function() {
  
    const isSessionValid_Boolean = await user_Object.fetchSessionDataMethod();

    if (isSessionValid_Boolean == true) {
        
        const id_Integer = stringQueryMethod('id'); 

        populateFormMethod(id_Integer);
        addEventListenerSave(user_Object, id_Integer);
        addEventListenerDelete(user_Object, id_Integer);
        restrictViewMethod(user_Object);
        addEventListenerLogOut(user_Object);
    } 
    else {
        window.location.href = '/Sites/SamsJSproject13/HTML/page0_ViewLogin.html';
    }
});
