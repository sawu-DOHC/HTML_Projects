
function submitCredentials() {

    var regex1 = /[A-Z]/;
    var regex2 = /[0-9]/;
    var regex3 = /[!$#%]/;

    var userName = document.getElementById('userNameField').value;
    var password = document.getElementById('passwordField1').value;
    var messageLabel = document.getElementById('messageLabel1');
    var form = document.getElementById('userForm'); 


    messageLabel.textContent = '';

    if (password.length < 8) {
        messageLabel.textContent = 'The password has to be at least 8 characters.';
    } 
    else if (regex1.test(password) != true) {
        messageLabel.textContent = 'Your password must include an uppercase letter.';
    } 
    else if (!regex2.test(password) != true) {
        messageLabel.textContent = 'Your password must include a number.';
    } 
    else if (!regex3.test(password) != true) {
        messageLabel.textContent = 'Your password must include a special character: !$#%';
    }
    else {// password meets all requirements, submit the form
        
        form.submit();
    }
}