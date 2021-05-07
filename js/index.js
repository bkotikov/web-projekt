function getIndexPage() {
    return new Promise(resolve)
}


var body = document.getElementById("body");
var ok = document.getElementById("ok");
var popup = document.getElementById("cookie");
var overlay = document.getElementById("overlay");

if (document.cookie === "") {
    body.style.overflow = "hidden";
    popup.style.display = "block";
    overlay.style.display = "block";
}
 
ok.addEventListener('click', () => {
    body.style.overflow = "auto";
    popup.style.display = "none";
    overlay.style.display = "none";
    document.cookie = "cookie=accecpted; path=/; samesite=strict";
}, true)