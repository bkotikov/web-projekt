const email = document.getElementById("emailAdresse");
const pass = document.getElementById("passwort");

const emailFehler = document.getElementById("emailFehlermeldung");
const passFehler = document.getElementById("passwortFehlermeldung");

email.oninput = function() {validiereEmail(this.value)};
pass.oninput = function(){validierePasswort(this.value)};
var fehler = false;
function validiereEmail(email){
  //var mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  var mailformat = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
  if (!email.trim().match(mailformat)){
    emailFehler.style.display = "block";
    if (fehler !== true) {
      fehler = true;
    }
  }else if (email.trim().match(mailformat)){
    if (fehler !== false) fehler =false;
    emailFehler.style.display = "none";
  }
}
var passwortFehler = false;
function validierePasswort(value){
  var passwortRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,}$/;

  if (!value.trim().match(passwortRegex)){
    passFehler.style.display = "block";
    if (passwortFehler !== true) {
      passwortFehler = true;
    }
  } else if (value.trim().match(passwortRegex)){
    if (passwortFehler !== false) {passwortFehler =false;}
    passFehler.style.display = "none";
  }
}

var plz = document.getElementById("postleitzahl");
if (plz){
  plz.oninput = function () {validierePlz(this.value)};
}

var plzFehler = false;
var plzFehlerEl = document.getElementById("plzFehlermeldung");
function validierePlz(value) {
  var plzFormat = /^[0-9]{5}$/;
  if(!value.trim().match(plzFormat) && value.length > 0){
    plzFehlerEl.style.display = "block";
    if(plzFehler !== true)plzFehler = true;
  } else if (value.trim().match(plzFormat)){
    plzFehlerEl.style.display = "none";
    if (plzFehler !== false)plzFehler = false;
  }
}

var hFehler = false;
var hausnummer = document.getElementById("hausnummer");
var hNummerFehler = document.getElementById("hnumberFehlermeldung");
if (hausnummer) {
  hausnummer.oninput = function() {validiereHausNummer(this.value)};
}


function validiereHausNummer(value) {
  
  var hausnummerFormat = /^[0-9]+$/;
  if(!value.trim().match(hausnummerFormat) && value.length > 0){
    hNummerFehler.style.display = "block";
    if(hFehler !== true)hFehler = true;
  } else if (value.trim().match(hausnummerFormat)){
    hNummerFehler.style.display = "none";
    if (hFehler !== false)hFehler = false;
  }
}

document.querySelector('#registrierung form').addEventListener('submit', function(e) {
  if (fehler){
    e.preventDefault();
  } else if (plzFehler) {
    e.preventDefault();
  } else if (passwortFehler){
    e.preventDefault();
  }
});
