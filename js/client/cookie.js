const cookie = document.querySelector(".cookie");

const front = document.querySelector(".front");
const back = document.querySelector(".back");



const backicon = document.querySelector(".back_icon");

const backbtn = document.getElementById('back');

backbtn.addEventListener("click", () => {
    back.style.display = "none";
    front.style.display = "flex";
});



backicon.addEventListener("click", () => {
    back.style.display = "none";
    front.style.display = "flex";
});

const tab = document.querySelector(".tab");

const liEl = tab.getElementsByTagName("li");

for (let i = 0; i < liEl.length; i++) {
    const element = liEl[i];
    element.addEventListener("click", function () {
        const iEl = element.getElementsByTagName("i")[0];
        const data = element.nextElementSibling;
        if (iEl.className == "far fa-minus") {
            iEl.classList.value = "fas fa-plus";
        } else {
            iEl.classList.value = "far fa-minus";
        }
        data.classList.toggle("active");
    });
}

const cookieName = "cookie=";
const acceptedAllCookie = "accepted-all";
const acceptedNeccesaryCookie = "accepted-neccesary";
const acceptedNeccesaryAndFunctional = "accepted-neccesary/functional";
const acceptedNeccesaryAndPerfomance = "accepted-neccesary/perfomance";
const pathName = "path=";
const path = "/";
const expires = "expires=";

const perfomanceCheckbox = document.getElementById("perfomance");
const functionalCheckbox = document.getElementById("functional");

const confirmedCookieButton = document.getElementById("confirmed");

const acceptedAll = document.getElementById('accepted-all');
acceptedAll.onclick = function () {
    document.cookie = cookieName + acceptedAllCookie + ";" + pathName + path + ";" + expires + expiresTime();
    cookie.style.display = "none";
}
const acceptedNeccesary = document.getElementById('accepted-neccesary');
acceptedNeccesary.onclick = function () {
    document.cookie = cookieName + acceptedNeccesaryCookie + ";" + pathName + path + ";" + expires + expiresTime();
    cookie.style.display = "none";
}

confirmedCookieButton.onclick = function() {
    if (perfomanceCheckbox.checked && functionalCheckbox.checked) {
        document.cookie = cookieName + acceptedAllCookie + ";" + pathName + path + ";" + expires + expiresTime();
        cookie.style.display = "none";
    }else if (perfomanceCheckbox.checked && !functionalCheckbox.checked){
        document.cookie = cookieName + acceptedNeccesaryAndPerfomance + ";" + pathName + path + ";" + expires + expiresTime();
        cookie.style.display = "none";
    }else if(!perfomanceCheckbox.checked && functionalCheckbox.checked){
        document.cookie = cookieName + acceptedNeccesaryAndFunctional + ";" + pathName + path + ";" + expires + expiresTime();
        cookie.style.display = "none";
    }else if(!perfomanceCheckbox.checked && !functionalCheckbox.checked){
        document.cookie = cookieName + acceptedNeccesary + ";" + pathName + path + ";" + expires + expiresTime();
        cookie.style.display = "none";
    }
}


function expiresTime() {
    var now = new Date();
    var time = now.getTime();
    var expireTime = time + 1000 * 36000;
    now.setTime(expireTime);
    return now;
}