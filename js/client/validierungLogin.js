function redirectToHomePage() {
  const lan = ["de", "en", "ru", "bg"];

  setTimeout(() => {
    for (const key of lan) {
      console.log("Key: " + key);
      if (window.location.href.indexOf(key) > 0) {
        window.location = "/" + key;
      } else {
        console.log("donw");
      }
    }
  }, 2000);
}
function hash(val) {
  if (val === "") {
    return "";
  }
  var hashObj = new jsSHA("SHA-512", "TEXT", { numRounds: 1 });
  hashObj.update(val);
  var hash = hashObj.getHash("HEX");
  return hash;
}

$("#submit").on("click", function (event) {
  event.preventDefault();
  const formData = {
    email: $("#email").val(),
    password: hash($("#password").val())
  };


  $.ajax({
    type: "POST",
    url: "/login",
    data: formData,
    //dataType: "json",
    encode: true
  }).done(done => {
    showSuccess();
    redirectToHomePage();
  }).fail(fail => {
    showError();
  });

});
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

function validateFields() {
  validateEmail(email.value);
  validatePasswort(passwort.value);

  if (validEmail && validPasswort) {
    enableBTN();
  } else {
    disableBTN();
  }
}

const email = document.getElementById("email");
email.oninput = function () { validateEmail(this.value); }
const emailFehler = document.getElementById("email-fehler");
function emptyValue(params) {
  if (params.trim() == null || params.trim() == "" || params === " ") {
    return true;
  } else {
    return false;
  }
}

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

function emailRegex(params) {
  const emailPattern = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;
  let regexEmailPattern = new RegExp(emailPattern);
  return regexEmailPattern.test(params);
}

function displayEmailError() {
  emailFehler.style.display = "block";
}

function hideEmailError() {
  emailFehler.style.display = "none";
}

const passwort = document.getElementById("password");
passwort.oninput = function () { validatePasswort(this.value); }

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
const passwortFehler = document.getElementById("passwort-fehler");
function displayPasswortError() {
  passwortFehler.style.display = "block";
}

function hidePasswortError() {
  passwortFehler.style.display = "none";
}
function passwortRegex(params) {
  const passwortPattern = "^(?=.*?[0-9])(?=.*?[A-Z])(?=.*?[#?!@$%^&*\\-_]).{8,}$";
  let passwortRegex = new RegExp(passwortPattern);
  return passwortRegex.test(params)
}

function getLength(params) {
  return params.length;
}

async function fieldsValidation() {
  setInterval(() => validateFields(), 1000);
}

fieldsValidation();