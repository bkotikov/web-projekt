var queryString = window.location.search;
var urlParams = new URLSearchParams(queryString);
var allPages = document.getElementsByClassName("page");

function setRightUrlParams() {
  if (parseInt(urlParams.get("page")) > allPages.length - 1) {
    urlParams.set("page", allPages.length - 1);
    window.history.pushState(this.href, '', `${location.pathname}?${urlParams}`);
  } else if (parseInt(urlParams.get("page")) < 0) {
    urlParams.set("page", 0);
    window.history.pushState(this.href, '', `${location.pathname}?${urlParams}`);
  } else {
    console.log("Position:" + parseInt(urlParams.get("page")));
  }
}

setRightUrlParams();

function getAndSetUrlParams() {
  for (let index = 0; index < allPages.length; index++) {
    allPages[index].style.display = "none";
  }
  allPages[parseInt(urlParams.get("page"))].style.display = "block";

  console.log("accessed getAndSetUrlParams Function");
}

getAndSetUrlParams();


const next = document.getElementById("next");
next.addEventListener("click", function () {
  console.log("position at next: " + urlParams.get("page") + 1);
  if ((parseInt(urlParams.get("page")) + 1) == allPages.length) {
    next.setAttribute('type', 'submit');
  } else {
    replaceUrlParams(true);
    hidePages();
  }
});

const prev = document.getElementById("prev");
prev.addEventListener("click", function () {
  if ((parseInt(urlParams.get("page")) - 1) == -1) {
    //prev.setAttribute('type', 'submit');
    console.log("prev");
    setTimeout(() => { console.log("World!"); }, 5000);
  } else {
    replaceUrlParams(false);
    hidePages();
  }
});

function hidePages() {
  for (let index = 0; index < allPages.length; index++) {
    allPages[index].style.display = "none";
  }
  allPages[parseInt(urlParams.get("page"))].style.display = "block";
}

function savePositionInCookie(params) {

}

function overwriteCookieIfExist(params) {

}

function getCookieIfExist(params) {

}

function replaceUrlParams(nextOrPrev) {
  if (nextOrPrev) {
    urlParams.set("page", parseInt(urlParams.get("page")) + 1);
    window.history.replaceState({ page: this.href }, '', `${location.pathname}?${urlParams}`);
  } else {
    urlParams.set("page", parseInt(urlParams.get("page")) - 1);
    window.history.replaceState({ page: this.href }, '', `${location.pathname}?${urlParams}`);
  }
}

function reloadPage() {
  const urlParams = new URLSearchParams(queryString);
  if (!(urlParams.has("page"))) {
    urlParams.set("page", 0);
    window.history.pushState(this.href, '', `${location.pathname}?${urlParams}`);
  }
}

reloadPage();