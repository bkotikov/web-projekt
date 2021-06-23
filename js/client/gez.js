
// HASH
var hashString = window.location.hash.substring(1);
var allPages = document.getElementsByClassName("page");


var emptyMsg = document.getElementById("emptyMsg");


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

// HASH


// SHOW SITE

function getAndSetUrlParams() {
  for (let index = 0; index < allPages.length; index++) {
    allPages[index].style.display = "none";
  }
  allPages[parseInt(hashString)].style.display = "block";
}

getAndSetUrlParams();

// SHOW SITE


$("#next").on("click", (event) => {
  if (validateFields()) {
    hash = urlHash();
    const inputs = $("#" + hash + " input");
    event.preventDefault();
    var formData = {};
    formData["page"] = hash;
    inputs.each(function() {
       
      if ($(this)[0].name === "gender" || $(this)[0].name === "payment" || $(this)[0].name === "payment_via") {
        
        if ($(this)[0].checked) {
            formData[$(this)[0].name] = $(this)[0].value;
          }else{
            if (formData[$(this)[0].name] === "" || formData[$(this)[0].name] === undefined) {
              formData[$(this)[0].name] = "";
            }
            
          }
      }else if($(this)[0].name === "accept_mandat" || $(this)[0].name === "accept"){
          if ($(this)[0].checked) {
            formData[$(this)[0].name] = $(this)[0].checked;
          }else{
            if (formData[$(this)[0].name] === "" || formData[$(this)[0].name] === undefined) {
              formData[$(this)[0].name] = "";
            }
            
          }
      }else{
        formData[$(this)[0].name] = $(this)[0].value;
      }
      
    });
    console.log(formData); 

    $.ajax({
        type: "POST",
        url: "/gez",
        data: formData,
        encode: true
    }).done(done => {
      if (urlHash() === 11 || (urlHash() === 7 && payment_via[1].checked)) {
        window.location.href = '/' + window.location.pathname.split('/')[1];
      }else{
        replaceUrlHash(true);
        getAndSetUrlParams();
      }
    }).fail(fail => {
        
    });
  }else{
    console.log("not valid");
    showError();
  }

  
});

const prev = document.getElementById("prev");
prev.addEventListener("click", function () {
  if ((parseInt(hashString) - 1) == -1) {
    //prev.setAttribute('type', 'submit');
    console.log("prev");
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

var mann = document.getElementById("men");
var frau = document.getElementById("woman");
var firstname = document.getElementById("firstname");
var firstnameFehler = document.getElementById("firstnameFehler");
firstname.addEventListener("input", () => {
  if (!firstnameValid()) {
    firstname.style.marginBottom = "1px";
    firstnameFehler.style.display = "block";
  }else{
    firstname.style.marginBottom = "1rem";
    firstnameFehler.style.display = "none";
  }
});
var secondname = document.getElementById("secondname");
var secondnameFehler = document.getElementById("secondnameFehler");
secondname.addEventListener("input", () => {
  if (!secondnameValid()) {
    secondname.style.marginBottom = "1px";
    secondnameFehler.style.display = "block";
  }else{
    secondname.style.marginBottom = "1rem";
    secondnameFehler.style.display = "none";
  }
});
var birthday = document.getElementById("birthday");
var birthdayFehler = document.getElementById("birthdayFehler");
birthday.addEventListener("input", () => {
  if (!birthdayValid()) {
    birthday.style.marginBottom = "1px";
    birthdayFehler.style.display = "block";
  }else{
    birthday.style.marginBottom = "1rem";
    birthdayFehler.style.display = "none";
  }
});
var startDay = document.getElementById("startDay");
var startDayFehler = document.getElementById("startDayFehler");
startDay.addEventListener("input", () => {
  if (!startDayValid()) {
    startDay.style.marginBottom = "1px";
    startDayFehler.style.display = "block";
  }else{
    startDay.style.marginBottom = "1rem";
    startDayFehler.style.display = "none";
  }
});
var street = document.getElementById("street");
var streetFehler = document.getElementById("streetFehler");
street.addEventListener("input", () => {
  if (!streetValid()) {
    street.style.marginBottom = "1px";
    streetFehler.style.display = "block";
  }else{
    street.style.marginBottom = "1rem";
    streetFehler.style.display = "none";
  }
});
var housenumber = document.getElementById("housenumber");
var housenumberFehler = document.getElementById("housenumberFehler");
housenumber.addEventListener("input", () => {
  if (!housenumberValid()) {
    housenumber.style.marginBottom = "1px";
    housenumberFehler.style.display = "block";
  }else{
    housenumber.style.marginBottom = "1rem";
    housenumberFehler.style.display = "none";
  }
});
var accept = document.getElementById("accept");
var payment = document.getElementsByName("payment");
var sname = document.getElementById("sname");
var snameFehler = document.getElementById("snameFehler");
sname.addEventListener("input", () => {
  if (!snameValid()) {
    sname.style.marginBottom = "1px";
    snameFehler.style.display = "block";
  }else{
    sname.style.marginBottom = "1rem";
    snameFehler.style.display = "none";
  }
});
var fname = document.getElementById("fname");
var fnameFehler = document.getElementById("fnameFehler");
fname.addEventListener("input", () => {
  if (!fnameValid()) {
    fname.style.marginBottom = "1px";
    fnameFehler.style.display = "block";
  }else{
    fname.style.marginBottom = "1rem";
    fnameFehler.style.display = "none";
  }
});
var street_mandat = document.getElementById("street-mandat");
var street_mandatFehler = document.getElementById("street-mandatFehler");
street_mandat.addEventListener("input", () => {
  if (!street_mandatValid()) {
    street_mandat.style.marginBottom = "1px";
    street_mandatFehler.style.display = "block";
  }else{
    street_mandat.style.marginBottom = "1rem";
    street_mandatFehler.style.display = "none";
  }
});
var housenumber_mandat = document.getElementById("housenumber-mandat");
var housenumber_mandatFehler = document.getElementById("housenumber-mandatFehler");
housenumber_mandat.addEventListener("input", () => {
  if (!housenumber_mandatValid()) {
    housenumber_mandat.style.marginBottom = "1px";
    housenumber_mandatFehler.style.display = "block";
  }else{
    housenumber_mandat.style.marginBottom = "1rem";
    housenumber_mandatFehler.style.display = "none";
  }
});
var code_mandat = document.getElementById("code-mandat");
var code_mandatFehler = document.getElementById("code-mandatFehler");
code_mandat.addEventListener("input", () => {
  if (!code_mandatValid()) {
    code_mandat.style.marginBottom = "1px";
    code_mandatFehler.style.display = "block";
  }else{
    code_mandat.style.marginBottom = "1rem";
    code_mandatFehler.style.display = "none";
  }
});
var city_mandat = document.getElementById("city-mandat");
var city_mandatFehler = document.getElementById("city-mandatFehler");
city_mandat.addEventListener("input", () => {
  if (!city_mandatValid()) {
    city_mandat.style.marginBottom = "1px";
    city_mandatFehler.style.display = "block";
  }else{
    city_mandat.style.marginBottom = "1rem";
    city_mandatFehler.style.display = "none";
  }
});
var payment_via = document.getElementsByName("payment_via");
var iban_mandat = document.getElementById("iban-mandat");
var iban_mandatFehler = document.getElementById("iban-mandatFehler");
iban_mandat.addEventListener("input", () => {
  if (!iban_mandatValid()) {
    iban_mandat.style.marginBottom = "1px";
    iban_mandatFehler.style.display = "block";
  }else{
    iban_mandat.style.marginBottom = "1rem";
    iban_mandatFehler.style.display = "none";
  }
});
var bic_mandat = document.getElementById("bic-mandat");
var bic_mandatFehler = document.getElementById("bic-mandatFehler");
bic_mandat.addEventListener("input", () => {
  if (!bic_mandatValid()) {
    bic_mandat.style.marginBottom = "1px";
    bic_mandatFehler.style.display = "block";
  }else{
    bic_mandat.style.marginBottom = "1rem";
    bic_mandatFehler.style.display = "none";
  }
});
var institut_mandat = document.getElementById("institut-mandat");
var institut_mandatFehler = document.getElementById("institut-mandatFehler");
institut_mandat.addEventListener("input", () => {
  if (!institut_mandatValid()) {
    institut_mandat.style.marginBottom = "1px";
    institut_mandatFehler.style.display = "block";
  }else{
    institut_mandat.style.marginBottom = "1rem";
    institut_mandatFehler.style.display = "none";
  }
});
var ort_mandat = document.getElementById("ort-mandat");
var ort_mandatFehler = document.getElementById("ort-mandatFehler");
ort_mandat.addEventListener("input", () => {
  if (!ort_mandatValid()) {
    ort_mandat.style.marginBottom = "1px";
    ort_mandatFehler.style.display = "block";
  }else{
    ort_mandat.style.marginBottom = "1rem";
    ort_mandatFehler.style.display = "none";
  }
});
var accept_mandat = document.getElementById("accept-mandat");












function urlHash() {
  return parseInt(window.location.hash.substring(1));
}

function genderValid() {
  return (mann.checked || frau.checked);
}

function firstnameValid() {
  return firstname.value.match(/^[a-zA-ZÄÖÜäöüß]+$/);
}

function secondnameValid() {
  return secondname.value.match(/^[a-zA-ZÄÖÜäöüß]+$/);
}

function birthdayValid() {
  return birthday.valueAsNumber <= Date.parse(new Date());
}

function startDayValid() {
  return (Date.parse(startDay.value) <= Date.parse(new Date) && startDay.value.includes("-"));
}

function housenumberValid() {
  return housenumber.value.match(/^[0-9]+[a-z]*$/);
}

function streetValid() {
  return street.value !== "";
}

function acceptValid() {
  return accept.checked;
}

function paymentValid() {
  for (const element of payment) {
    if (element.checked) {
      return true;
    }
  }
  return false;
}

function payment_viaValid() {
  for (const element of payment_via) {
    if (element.checked) {
      return true;
    }
  }
  return false;
}

function fnameValid() {
  return fname.value.match(/^[a-zA-ZÄÖÜäöüß]+$/);
}

function snameValid() {
  return sname.value.match(/^[a-zA-ZÄÖÜäöüß]+$/);
}

function street_mandatValid() {
  return street_mandat.value !== "";
}

function housenumber_mandatValid() {
  return housenumber_mandat.value.match(/^[0-9]+[a-z]*$/);
}

function code_mandatValid() {
  return code_mandat.value.match(/^[0-9]{5}$/);
}

function city_mandatValid() {
  return city_mandat.value.match(/^[a-zA-Z]+$/);
}

function iban_mandatValid() {
  return iban_mandat.value.match(/^[a-zA-Z]{2}[0-9]{2}[a-zA-Z0-9]{4}[0-9]{7}([a-zA-Z0-9]?){0,16}$/);
}

function bic_mandatValid() {
  return bic_mandat.value.match(/^([a-zA-Z]{4}[a-zA-Z]{2}[a-zA-Z0-9]{2}([a-zA-Z0-9]{3})?)$/);
}

function institut_mandatValid() {
  return institut_mandat.value !== "";
}

function ort_mandatValid() {
  return ort_mandat.value !== "";
}

function accept_mandatValid() {
  return accept_mandat.checked;
}


function getLength(params) {
  return params.length;
}

function validateFields() {
  switch (urlHash()) {
    case 0:
      return (genderValid() && firstnameValid() && secondnameValid() &&  birthdayValid());
    case 1:
      return startDayValid();
    case 2:
      return (streetValid() && housenumberValid());
    case 3:
      return true;
    case 4:
      return true;
    case 5:
      return acceptValid();
    case 6:
      return paymentValid();
    case 7:
      return payment_viaValid();
    case 8:
      return (fnameValid() && snameValid());
    case 9:
      return (street_mandatValid() && housenumber_mandatValid() && code_mandatValid() && city_mandatValid()) 
    case 10:
      return (iban_mandatValid() && bic_mandatValid() && institut_mandatValid() && ort_mandatValid());
    case 11:
      return accept_mandatValid();
    default:
      break;
  }
}