const toaster = document.getElementsByClassName('toaster')[0];
const form = document.querySelector('form');

/*GentleForm(document.getElementById('singup'), function onSubmit (event) {
  event.preventDefault();

  if (this.isValid()) addToast('success', 'Yay, the form is valid!');else
  addToast('error', 'Oops, the form is invalid.');
});*/

function addToast(type, message) {
  const toast = document.createElement('div');

  toast.classList.add('toast');
  toast.classList.add('toast--' + type);
  toast.innerHTML = message;

  toaster.appendChild(toast);

  toast.addEventListener('transitionend', function (event) {
    if (event.propertyName !== 'transform') return;

    if (toast.classList.contains('toast--show')) {
      setTimeout(function () {
        toast.classList.remove('toast--show');
      }, 3000);
    } else {
      toaster.removeChild(toast);
    }
  }, false);

  setTimeout(() => toast.classList.add('toast--show'), 100);
}

const nachname = document.getElementById("name");
nachname.oninput = function() {validiereNachname(this.value)};
const nachnameFehler = document.getElementById("nachnameFehler");
var surnameError = true;
function validiereNachname(string) {
  if (string.length > 28){
    nachnameFehler.style.display = "block";
    surnameError = true;
  } else {
    nachnameFehler.style.display = "none";
    surnameError = false;
  }
}

const vorname = document.getElementById("vorname");
const vornameFehler = document.getElementById("vornameFehler");
var firstNameError = true;
vorname.oninput = function() {validiereVorname(this.value)};

function validiereVorname(string){
  if (string.length > 19){
    vornameFehler.style.display = "block";
    firstNameError = true;
  } else {
    vornameFehler.style.display = "none";
    firstNameError = false;
  }
}

const date = document.getElementById("geburtsdatum");
const datumFehler = document.getElementById("fehlerGeburtsdatum");
var dateError = true;

date.onchange = function() {validiereDatum(this.value)};

function validiereDatum(date){
  var regex = /^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/;
  if (!date.trim().match(regex)){
    datumFehler.style.display = "block";
    dateError = true;
  } else {
    datumFehler.style.display = "none";
    dateError = false;
  }
}

const weiter = document.getElementById("weiter");
weiter.onclick = function() {wechselScreen()};
const wohnungsanmeldung = document.getElementById("wohnungsanmeldung");
const person = document.getElementById("person")

function wechselScreen() {
  var radios = document.querySelectorAll('input[type="radio"]:checked');
  var value = radios.length>0? radios[0].value: null;
  if (surnameError === false && firstNameError === false && dateError === false && value != null){
    wohnungsanmeldung.style.display = "block";
    person.style.display = "none";
  }else {}
}

const anmeldung = document.getElementById("monat");
anmeldung.oninput = function(){validiereMonatUndJahr(this.value)};
const anmeldungFehler = document.getElementById("fehlerMonat");
var monthError = true;

function validiereMonatUndJahr(date){
  date = date.split("-");
  var jahr = validiereJahr(date[0]);
  var monat = validiereMonat(date[1]);
  if (!jahr || !monat){
    anmeldungFehler.style.display = "block";
    monthError = true;
  }else {
    anmeldungFehler.style.display = "none";
    monthError = false;
  }
}

function validiereJahr(jahr){
  var currentYear = new Date().getFullYear();
  jahr = parseInt(jahr, 10);
  //Jahr Fehler wenn nicht im aktuellen, letzten oder zukünftigen Jahr
  if (jahr === (currentYear+1) || jahr === (currentYear-1) || jahr === currentYear){
    return true;
  } else{
    return false;
  }
}

function validiereMonat(monat){
  if (monat < 13 && monat > 0){
    return true;
  } else {
    return false;
  }
}

var straße = document.getElementById("straße");
var fehlerStraße = true;
straße.oninput = function() {straßeValidieren(this.value)};

function straßeValidieren(value){
  if (value.trim() === ""){
    fehlerStraße = true
  } else {
    fehlerStraße = false;
  }
}

var hFehler = true;
var hausnummer = document.getElementById("hausnummer");
var hNummerFehler = document.getElementById("hnumberFehlermeldung");
hausnummer.oninput = function() {validiereHausNummer(this.value)};

function validiereHausNummer(value) {
  var hausnummerFormat = /^[0-9]+$/;
  if(!value.trim().match(hausnummerFormat) && value.length > 0){
    hNummerFehler.style.display = "block";
    hFehler = true;
  } else if (value.trim().match(hausnummerFormat)){
    hNummerFehler.style.display = "none";
    hFehler = false;
  }
}

var plz = document.getElementById("plz");
if (plz){
  plz.oninput = function () {validierePlz(this.value)};
}

var plzFehler = true;
var plzFehlerEl = document.getElementById("plzFehlermeldung");
function validierePlz(value) {
  var plzFormat = /^[0-9]{5}$/;
  if(!value.trim().match(plzFormat) && value.length > 0){
    plzFehlerEl.style.display = "block";
    plzFehler = true;
  } else if (value.trim().match(plzFormat)){
    plzFehlerEl.style.display = "none";
    plzFehler = false;
  }
}

var stadt = document.getElementById("stadt");
var stadtFehler = true;
stadt.oninput = function() {stadtValidieren(this.value)};

function stadtValidieren(value){
  if (value === ""){
    stadtFehler = true
  } else {
    stadtFehler = false;
  }
}

const weiter1 = document.getElementById("weiter-1");
weiter1.onclick = function() {zurZahlung()};
const zahlung = document.getElementById("zahlung");

function zurZahlung(){
  if(monthError === false && hFehler === false && plzFehler === false && stadtFehler === false && fehlerStraße === false){
    wohnungsanmeldung.style.display = "none";
    zahlung.style.display = "block";
  }
}

const weiter2 = document.getElementById("weiter-2");
weiter2.onclick = function() {zurLastschrift()};

const lastschirft = document.getElementById("lastschrift");

function zurLastschrift(){
  if(monthError === false && hFehler === false && plzFehler === false && stadtFehler === false && fehlerStraße === false){
    zahlung.style.display = "none";
    lastschirft.style.display = "block";
  }
}
