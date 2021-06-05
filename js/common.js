$(function () {
    $("#header").load("/static/html/header.html");
    $("#footer").load("/static/html/footer.html");
});

if (Cookies.get('cookie') === undefined) {
    $(function () {
        $("#cookie").load("/static/html/cookie.html");
    });
} else {

}