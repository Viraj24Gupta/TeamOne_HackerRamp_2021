function validate() {
    let passwordRegex = /^[A-Za-z0-9]{7,}$/;
    let password = document.getElementById("password");
    let conpass = document.getElementById("confirm_password");

    if (!passwordRegex.test(password.value)) {
        password.setCustomValidity("password should be minimum 7 characters");
    }
    else {
        password.setCustomValidity("");
    }

    if (conpass.value !== password.value ){
        conpass.setCustomValidity("password do not match");
    }
    else{
        conpass.setCustomValidity("");
    }
}