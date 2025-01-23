const user_Object = new UserClass();

document.addEventListener('DOMContentLoaded', async function() {

    const isSessionValid_Boolean = await user_Object.fetchSessionDataMethod();

    if (isSessionValid_Boolean == true) {

        const data_Array = await fetchDataMethod('Partner_ID', 'ASC');

        populateTableMethod(user_Object, data_Array);
        restrictViewMethod(user_Object);
        addEventListenerSort(user_Object);
        addEventListenerSelection(user_Object);
        addEventListenerLogOut(user_Object);
    } 
    else {
        window.location.href = '/Sites/SamsJSproject13/HTML/page0_ViewLogin.html';
    }
});
