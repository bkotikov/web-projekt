var lang  = window.location.pathname.split('/')[1];
$(function () {
    if (window.location.pathname.split('/')[1] !== "") {
        $("#header").load("/" + lang +"/header");
        $("#footer").load("/static/html/" + lang + "/footer.html");
    }else{
        $("#header").load("/de/header");
        $("#footer").load("/static/html/de/footer.html");
    }
    
});
/* Footer, Header und Cookie in der jeweiligen Sprache laden URL zusammenbauen */
if (Cookies.get('cookie') === undefined) {
    $(function () {
        $("#cookie").load('/' + lang + '/cookie');
    });
} else {

}