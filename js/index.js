function getIndexPage() {
    return new Promise(resolve)
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
}

var body = document.getElementById("body");
var ok = document.getElementById("ok");
var deny = document.getElementById("reject");
var popup = document.getElementById("cookie");
var overlay = document.getElementById("overlay");




console.log(getCookie("dvsgo"));
var dvsgo = getCookie("dvsgo");
if (dvsgo !== "accecpted" && dvsgo !== "rejected") {
    console.log("jo")
    body.style.overflow = "hidden";
    popup.style.display = "block";
    overlay.style.display = "block";
}
 
ok.addEventListener('click', () => {
    document.cookie = "dvsgo=accecpted; path=/; samesite=strict";
    body.style.overflow = "auto";
    popup.style.display = "none";
    overlay.style.display = "none";
}, true);

deny.addEventListener('click', () => {
    document.cookie = "dvsgo=rejected; path=/; samesite=strict";
    body.style.overflow = "auto";
    popup.style.display = "none";
    overlay.style.display = "none";
}, true);