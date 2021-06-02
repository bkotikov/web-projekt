
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






function savePositionInCookie(params) {

}

function overwriteCookieIfExist(params) {

}

function getCookieIfExist(params) {

}

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

/*
 async function showSuccess() {
  const success = document.getElementById("success-div");
  success.style.display = "block";
  hideSuccess();
}

 async function hideSuccess() {
  const success = document.getElementById("success-div");
  setTimeout(() => { success.style.display = "none"; }, 3000);
}

 async function showError() {
  const error = document.getElementById("error-div");
  error.style.display = "block";
  hideError();
}

 async function hideError() {
  const error = document.getElementById("error-div");
  setTimeout(() => { error.style.display = "none"; }, 3000);
}
*/