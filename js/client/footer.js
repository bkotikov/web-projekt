const de = document.getElementById("de");
const en = document.getElementById("en");
const ru = document.getElementById("ru");
const bg = document.getElementById("bg");

de.addEventListener("click", changeLangDe);
en.addEventListener("click", changeLangEn);
ru.addEventListener("click", changeLangRu);
bg.addEventListener("click", changeLangBg);

function changeLangDe() {
    changeLang("de");
}
function changeLangEn() {
    changeLang("en");
}
function changeLangRu() {
    changeLang("ru");
}
function changeLangBg() {
    changeLang("bg");
}

function changeLang(lang) {
    if (lang === window.location.pathname.split('/')[1]) {
        return;
    }
    path = window.location.pathname.split('/');
    newPath = "/" + lang;
    for (let index = 2; index < path.length; index++) {
       const element = path[index];
       newPath += "/" + element;
    }
   window.location.href = newPath + window.location.hash;
}