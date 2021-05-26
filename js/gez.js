var allPages = document.getElementsByClassName("page");
for (let index = 0; index < allPages.length; index++) {
  allPages[index].style.display = "none";
}

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
console.log((urlParams.has('page')));
console.log((urlParams.get("page")));
if (!(urlParams.has("page"))) {
  urlParams.set("page", 0);
  window.history.pushState(this.href, '', `${location.pathname}?${urlParams}`);
}

if (parseInt(urlParams.get("page")) > allPages.length - 1) {
  urlParams.set("page", allPages.length - 1);
  window.history.pushState(this.href, '', `${location.pathname}?${urlParams}`);
} else if (parseInt(urlParams.get("page")) < 0) {
  urlParams.set("page", 0);
  window.history.pushState(this.href, '', `${location.pathname}?${urlParams}`);
} else {
  console.log("Position:" + parseInt(urlParams.get("page")));
}

allPages[parseInt(urlParams.get("page"))].style.display = "block";

const successdiv = document.getElementById("success-div");
successdiv.style.display = "none";
const next = document.getElementById("next");
next.addEventListener("click", function () {
  if ((parseInt(urlParams.get("page")) + 1) == allPages.length) {
    next.setAttribute('type', 'submit');
    console.log("submitted");
    successdiv.style.display = "block";
    setTimeout(() => {
      console.log("Submitted");
      successdiv.style.display = "none";
    }, 3000);
  } else {
    urlParams.set("page", parseInt(urlParams.get("page")) + 1);
    window.history.replaceState({ page: this.href }, '', `${location.pathname}?${urlParams}`);
    window.top.location = window.top.location;
  }
});

const prev = document.getElementById("prev");
prev.addEventListener("click", function () {
  if ((parseInt(urlParams.get("page")) - 1) == -1) {
    //prev.setAttribute('type', 'submit');
    console.log("prev");
    setTimeout(() => { console.log("World!"); }, 5000);
  } else {
    urlParams.set("page", parseInt(urlParams.get("page")) - 1);
    window.history.replaceState({ page: this.href }, '', `${location.pathname}?${urlParams}`);
    window.top.location = window.top.location;
  }
});