function redirectToHomePage() {
    setTimeout(() => {
        window.location.href = '/';
    }, 2000);
}

$("#submit").click(function (event) {
    event.preventDefault();
    const formData = {
        email: $("#email").val(),
        password: $("#password").val()
    };

    $.ajax({
        type: "POST",
        url: "/login",
        data: formData,
        //dataType: "json",
        encode: true
    }).done(done => {
        showSuccess();
        redirectToHomePage();
    }).fail(fail => {
        showError();
    });

});