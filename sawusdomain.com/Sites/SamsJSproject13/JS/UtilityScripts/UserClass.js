class UserClass {
    constructor() {
        this.username_string = '';
        this.password_string = '';
        this.permissions_string = '';
    }

    async fetchSessionDataMethod() {
        try {
            const response = await fetch('/Sites/SamsJSproject13/PHP/UtilityScripts/SessionControl.php?action=get_session_data');

            const sessionData = await response.json();

            if (!sessionData.username) {
                throw new Error('User not logged in');
            }

            this.username_string = sessionData.username;
            this.password_string = sessionData.password;
            this.permissions_string = sessionData.permissions;

            console.log('Session Data:', sessionData);

            sessionStorage.setItem('user', JSON.stringify(sessionData));

            return true;
        } catch (error) {
            console.error('Error fetching session data:', error.message);
            return false;
        }
    }

    async loginMethod(username, password) {
        try {
            const formData_Object = new FormData();
            formData_Object.append('username', username);
            formData_Object.append('password', password);

            const response_Object = await fetch('/Sites/SamsJSproject13/PHP/Page0_Scripts/QueryUsers.php', {
                method: 'POST',
                body: formData_Object
            });

            const data_Object = await response_Object.json(); // directly parse JSON

            console.log('Server Response:', data_Object);

            if (data_Object.status === 'success') {
                this.username_string = data_Object.username;
                this.password_string = data_Object.password;
                this.permissions_string = data_Object.permissions;

                sessionStorage.setItem('user', JSON.stringify({
                    username: this.username_string,
                    password: this.password_string,
                    permissions: this.permissions_string
                }));

                window.location.href = '/Sites/SamsJSproject13/HTML/page1_ViewTable.html';
            } 
            else if (data_Object.status === 'error') {
                console.error('Error during login:', data_Object.message);
                alert(`Login failed: ${data_Object.message}`);
            }
        } catch (error_Object) {
            console.error('JavaScript: Check those credentials bubba.', error_Object);
            alert('JavaScript: Check those credentials bubba.');
        }
    }

    async logoutMethod() {
        try {
            const response = await fetch('/Sites/SamsJSproject13/PHP/UtilityScripts/LogOut.php', {
                method: 'POST',
            });

            const data = await response.json();
            console.log('Server Response:', data);

            if (data.status === 'success') {
                sessionStorage.removeItem('user');
                this.username_string = '';
                this.password_string = '';
                this.permissions_string = '';

                console.log('User logged out successfully');
                window.location.href = '/Sites/SamsJSproject13/HTML/page0_ViewLogin.html';
            } else {
                alert('Logout failed: ' + (data.message || 'Unknown error'));
            }
        } catch (error) {
            console.error('Error during logout:', error);
            alert('Logout failed due to a network error.');
        }
    }

    hasPermissionMethod(requiredPermission) {
        return this.permissions_string.includes(requiredPermission);
    }
}
