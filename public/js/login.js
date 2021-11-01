$('input').focus(function(){
    $(this).parents('.form-group').addClass('focused');
});

$('input').blur(function(){
    var inputValue = $(this).val();
    if ( inputValue == "" ) {
        $(this).removeClass('filled');
        $(this).parents('.form-group').removeClass('focused');
    } else {
        $(this).addClass('filled');
    }
})

function password_show(id1, id2) {
    let eye = document.getElementById(id1);
    let pass = document.getElementById(id2);
    if (pass.type === "password") {
        pass.type = "text";
        eye.setAttribute("data-icon", "zmdi:eye-off");
    }
    else {
        pass.type = "password";
        eye.setAttribute("data-icon", "zmdi:eye");
    }
}