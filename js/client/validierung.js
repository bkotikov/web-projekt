function hash(val) {
  var hashObj = new jsSHA("SHA-512", "TEXT", { numRounds: 1 });
  hashObj.update(val);
  var hash = hashObj.getHash("HEX");
  return hash;
}


const vorname = document.getElementById("vorname");
vorname.oninput = function () { validateVorname(this.value); }
vorname.onload = function () { console.log("load"); }

const vornameFehler = document.getElementById("vorname-fehler");

const nachname = document.getElementById("nachname");
nachname.oninput = function () { validateNachname(this.value); }

const nachnameFehler = document.getElementById("nachname-fehler");

const email = document.getElementById("email");
email.oninput = function () { validateEmail(this.value); }

const emailFehler = document.getElementById("email-fehler");

const passwort = document.getElementById("passwort");
passwort.oninput = function () { validatePasswort(hash(this.value)); }

const passwortFehler = document.getElementById("passwort-fehler");

const passwortRepeat = document.getElementById("password-bestatigen");
passwortRepeat.oninput = function () { matchPasswort(hash(this.value), hash(passwort.value)); }

const passwortRepeatFehler = document.getElementById("passwortRepeat-fehler");

const submitBtn = document.getElementById("submit");





function disableBTN() {
  submitBtn.style.backgroundColor = "#778899";
  submitBtn.disabled = true;
}

function enableBTN() {
  submitBtn.style.backgroundColor = "#000";
  submitBtn.disabled = false;
}

disableBTN();

function getLength(params) {
  return params.length;
}

function VNCommonRegex(params) {
  let patt = "^(\s)*[A-Za-z]+((\s)?((\'|\-|\.)?([A-Za-z])+))*(\s)*$";
  let regexPattern = new RegExp(patt);
  return regexPattern.test(params);
}

function emailRegex(params) {
  const emailPattern = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;
  let regexEmailPattern = new RegExp(emailPattern);
  return regexEmailPattern.test(params);
}

function passwortRegex(params) {
  const passwortPattern = "^(?=.*?[0-9])(?=.*?[A-Z])(?=.*?[#?!@$%^&*\\-_]).{8,}$";
  let passwortRegex = new RegExp(passwortPattern);
  return passwortRegex.test(params)
}

var validVorname = false;
function validateVorname(params) {
  len = getLength(params);
  if ((len > 2 && len < 33) && !emptyValue(params) && VNCommonRegex(params)) {
    hideVornameOrNachnameError(true);
    validVorname = true;
    return true;
  } else {
    if (params !== "") {
      displayVornameOrNachnameError(true);
    }
    validVorname = false;
    return false;
  }
}

var validNachname = false;
function validateNachname(params) {
  len = getLength(params);
  if ((len > 2 && len < 33) && !emptyValue(params) && VNCommonRegex(params)) {
    hideVornameOrNachnameError(false);
    validNachname = true;
    return true;
  } else {
    validNachname = false;
    if (params !== "") {
      displayVornameOrNachnameError(false);
    }
    return false;
  }
}

var validEmail = false;
function validateEmail(params) {
  if (!emptyValue(params) && emailRegex(params)) {
    hideEmailError();
    validEmail = true;
    return true;
  } else {
    if (params !== "") {
      displayEmailError();
    }
    validEmail = false;
    return false;
  }
}

var validPasswort = false;
function validatePasswort(params) {
  len = getLength(params);
  if (len > 7 && passwortRegex(params)) {
    hidePasswortError();
    validPasswort = true;
    return true;
  } else {
    if (params !== "") {
      displayPasswortError();
    }
    validPasswort = false;
    return false;
  }
}

var matchedPasswort = false;
function matchPasswort(params, param) {
  if ((params == param) && passwortRegex(param)) {
    hideRepeatPasswortError();
    matchedPasswort = true;
    return true;
  } else {
    if (params !== "") {
      displayRepeatPasswortError();
    }
    matchedPasswort = false;
    return false;
  }
}

function emptyValue(params) {
  if (params.trim() == null || params.trim() == "" || params === " ") {
    return true;
  } else {
    return false;
  }
}

function displayVornameOrNachnameError(params) {
  if (params) {
    vornameFehler.style.display = "block";
  } else {
    nachnameFehler.style.display = "block";
  }
}

function hideVornameOrNachnameError(params) {
  if (params) {
    vornameFehler.style.display = "none";
  } else {
    nachnameFehler.style.display = "none";
  }
}

function displayEmailError() {
  emailFehler.style.display = "block";
}

function hideEmailError() {
  emailFehler.style.display = "none";
}

function displayPasswortError() {
  passwortFehler.style.display = "block";
}

function hidePasswortError() {
  passwortFehler.style.display = "none";
}

function displayRepeatPasswortError() {
  passwortRepeatFehler.style.display = "block";
}

function hideRepeatPasswortError() {
  passwortRepeatFehler.style.display = "none";
}

async function fieldsValidation() {
  setInterval(() => validateFields(), 1000);
}

function validateFields() {
  validateVorname(vorname.value);
  validateNachname(nachname.value);
  validateEmail(email.value);
  validatePasswort(passwort.value);
  matchPasswort(passwortRepeat.value, passwort.value);

  if (validVorname && validNachname && validEmail && validPasswort && matchedPasswort) {
    enableBTN();
  } else {
    disableBTN();
  }
}

fieldsValidation();

/*
  vorname
  nachname
  passwort
  email
  password-bestatigen
*/

/*
  Code 201 wenn Nutzer in die DB eingetragen wurde
  Code 409 wenn der Nutzer bereits in der DB existiert
*/


function redirectToHomePage() {
  const lan = ["de", "en", "ru", "bg"];

  setTimeout(() => {
    for (const key of lan) {
      console.log("Key: " + key);
      if (window.location.href.indexOf(key) > 0) {
        window.location = location.href.replace("/" + key + "/", "/" + key + "/");
      } else {
        console.log("donw");
      }
    }
  }, 2000);
}

$("#submit").on("click", function (event) {
  event.preventDefault();
  var formData = {
    vorname: $("#vorname").val(),
    nachname: $("#nachname").val(),
    passwort: hash($("#passwort").val()),
    email: $("#email").val(),
    passwordBes: hash($("#password-bestatigen").val())
  };

  $.ajax({
    type: "POST",
    method: 'POST',
    url: "/registration",
    data: formData,
    //dataType: "json",
    encode: true
  }).done(done => {
    showSuccess();
    //redirectToHomePage();
    const lan = ["en", "ru", "bg", "de"];

    for (const key of lan) {
      console.log("Key: " + key);
      if (window.location.href.indexOf(key) > 0) {
        console.log("test: " + window.location);
        window.location = "/" + key;
      } else {
        console.log("donw");
      }
    }
  }).fail(fail => {
    showError();
  });

});