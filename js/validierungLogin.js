function redirectToHomePage() {
    setTimeout(() => {
        window.location.href = '/';
    }, 2000);
}
function hash(val) {
    if (val === "") {
        return "";
    }
    var hashObj = new jsSHA("SHA-512", "TEXT", {numRounds: 1});
    hashObj.update(val);
    var hash = hashObj.getHash("HEX");
    return hash;
  }

$("#submit").on("click", function (event) {
    event.preventDefault();
    const formData = {
        email: $("#email").val(),
        password: hash($("#password").val())
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