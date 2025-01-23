function restrictViewMethod(user_Object) {

    const userRole_String = user_Object.permissions_string;

    const elements_NodeList = document.querySelectorAll('[data-role]');

    for (let i = 0; i < elements_NodeList.length; i++) {

        const element_Node = elements_NodeList[i];
        const roles_Array = element_Node.getAttribute('data-role').split(',');

        if (!roles_Array.includes(userRole_String)) {
            element_Node.style.display = 'none';
        }

    }

    if (userRole_String !== 'admin') {

        const adminColumns_NodeList = document.querySelectorAll('.admin-group');

        for (let j = 0; j < adminColumns_NodeList.length; j++) {
            adminColumns_NodeList[j].style.display = 'none';
        }

    }
    
}
