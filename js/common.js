$(function () {
    $("#header").load("/de/header");
    $("#footer").load("/static/html/footer.html");
});

if (Cookies.get('cookie') === undefined) {
    $(function () {
        $("#cookie").load("/static/html/cookie.html");
    });
} else {

}