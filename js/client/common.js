$(function () {
    if (window.location.pathname.split('/')[1] !== "") {
        $("#header").load("/" + window.location.pathname.split('/')[1] +"/header");
        $("#footer").load("/static/html/" + window.location.pathname.split('/')[1] + "/footer.html");
    }else{
        $("#header").load("/de/header");
        $("#footer").load("/static/html/de/footer.html");
    }
    
});

if (Cookies.get('cookie') === undefined) {
    $(function () {
        $("#cookie").load("/static/html/cookie.html");
    });
} else {

}