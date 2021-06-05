
var hashString = window.location.hash.substring(1);
var allPages = document.getElementsByClassName("page");

function update() {
  hashString = window.location.hash.substring(1);
}

function setRightUrlParams() {
  if (hashString === "") {
    window.history.replaceState(this.href, '', `#0`);
  }
  if (parseInt(hashString) > allPages.length - 1) {
    window.history.replaceState(this.href, '', `#${allPages.length - 1}`);
  } else if (parseInt(hashString) < 0) {
    window.history.replaceState(this.href, '', `#0`);
  }
  update();
}

setRightUrlParams();

function getAndSetUrlParams() {
  for (let index = 0; index < allPages.length; index++) {
    allPages[index].style.display = "none";
  }
  allPages[parseInt(hashString)].style.display = "block";
}

getAndSetUrlParams();


const next = document.getElementById("next");
next.addEventListener("click", function () {
  if ((parseInt(hashString) + 1) == allPages.length) {
    next.setAttribute('type', 'submit');
    showSuccess();
  } else {
    replaceUrlHash(true);
    getAndSetUrlParams();
  }
});

const prev = document.getElementById("prev");
prev.addEventListener("click", function () {
  if ((parseInt(hashString) - 1) == -1) {
    //prev.setAttribute('type', 'submit');
    console.log("prev");
    setTimeout(() => { console.log("World!"); }, 5000);
  } else {
    replaceUrlHash(false);
    getAndSetUrlParams();
  }
});

function replaceUrlHash(nextOrPrev) {
  if (nextOrPrev) {
    window.history.pushState({ page: this.href }, '', `#${parseInt(hashString) + 1}`);
  } else {
    window.history.pushState({ page: this.href }, '', `#${parseInt(hashString) - 1}`);
  }
  update();
}

window.addEventListener("hashchange", () => {
  update();
  getAndSetUrlParams();
});

const mann = document.getElementById("men");
const frau = document.getElementById("woman");
const firstname = document.getElementById("firstname");
const secondname = document.getElementById("secondname");
const birthday = document.getElementById("birthday");
const startDay = document.getElementById("startDay");

/*
if (!mann.checked || !frau.checked) {
  next.style.background = "#888888";
}
*/

//console.log(window.location.hash.substring(1));

function urlHash() {
  return parseInt(window.location.hash.substring(1));
}

function disableBTN() {
  next.style.backgroundColor = "#778899";
  next.disabled = true;
}

function enableBTN() {
  next.style.backgroundColor = "#33c74f";
  next.disabled = false;
}

disableBTN();

async function fieldsValidation() {
  setInterval(() => validateFields(), 3000);
}

function getLength(params) {
  return params.length;
}

function validateFields() {
  switch (urlHash()) {
    case 0:
      if ((mann.checked || frau.checked) && firstname.value.length > 2 && secondname.value.length > 2 &&  birthday.value != "") {
        enableBTN();
      }else{
        disableBTN();
      }
      break;
    case 1:
      if (startDay.value != "") {
        enableBTN();
      } else {
        disableBTN();
      }
      break;
    case value:
      break;
    case value:
      break;
    case value:
      break;
    case value:
      break;
    case value:
      break;
    case value:
      break;
    case value:
      break;
    case value:
      break;
    case value:
      break;
    case value:
      break;
    default:
      break;
  }
}

fieldsValidation();