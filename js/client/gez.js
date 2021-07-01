
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
    const inputs = $("input");
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
    }).done(data => {
      if (urlHash() === 11 || (urlHash() === 7 && payment_via[1].checked)) {
                    var egal = new Uint8Array(Object.values(data));
                    console.log("egal: " + egal)
                    var blob = new Blob([egal], { type: "application/octetstream" });
 
                    //Check the Browser type and download the File.
                    var isIE = false || !!document.documentMode;
                    if (isIE) {
                        window.navigator.msSaveBlob(blob, "gez.pdf");
                    } else {
                        var url = window.URL || window.webkitURL;
                        link = url.createObjectURL(blob);
                        var a = $("<a />");
                        a.attr("download", "gez.pdf");
                        a.attr("href", link);
                        $("body").append(a);
                        a[0].click();
                        $("body").remove(a);
                    }
                    showSuccess()
                    setTimeout(() => { window.location.href =  '/' + window.location.pathname.split('/')[1]}, 3000);
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
  window.history.back();
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
var code = document.getElementById("code");
var codeFehler = document.getElementById("codeFehler");
code.addEventListener("input", () => {
  if (!codeValid()) {
    code.style.marginBottom = "1px";
    codeFehler.style.display = "block";
  }else{
    code.style.marginBottom = "1rem";
    codeFehler.style.display = "none";
  }
});

var city = document.getElementById("city");
var cityFehler = document.getElementById("cityFehler");
city.addEventListener("input", () => {
  if (!cityValid()) {
    city.style.marginBottom = "1px";
    cityFehler.style.display = "block";
  }else{
    city.style.marginBottom = "1rem";
    cityFehler.style.display = "none";
  }
});

var optionalAdress = document.getElementById("optionalAdress");
var optionalAdressFehler = document.getElementById("optionalAdressFehler");
optionalAdress.addEventListener("input", () => {
  if (!optionalAdressValid()) {
    optionalAdress.style.marginBottom = "1px";
    optionalAdressFehler.style.display = "block";
  }else{
    optionalAdress.style.marginBottom = "1rem";
    optionalAdressFehler.style.display = "none";
  }
});


var mobilenumber = document.getElementById("mobilenumber");
var mobilenumberFehler = document.getElementById("mobilenumberFehler");
mobilenumber.addEventListener("input", () => {
  if (!mobilenumberValid()) {
    mobilenumber.style.marginBottom = "1px";
    mobilenumberFehler.style.display = "block";
  }else{
    mobilenumber.style.marginBottom = "1rem";
    mobilenumberFehler.style.display = "none";
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



jQuery(function() {
  $.ajax({
    type: "GET",
    url: "/gezData",
    encode: true
  }).done(data => {
    console.log(data)
    if (data.gender === "men") {
      mann.checked = true
    }else if(data.gender === "woman"){
      frau.checked = true
    }
    firstname.value = data.firstname;
    secondname.value = data.secondname;
    bday = new Date(data.birthday);
    birthday.value = bday.getFullYear() + "-" + ('0' + (bday.getMonth()+1)).slice(-2) + "-" + ('0' + bday.getDate()).slice(-2);
    sday = new Date(data.startday);
    startDay.value = sday.getFullYear() + "-" + ('0' + (sday.getMonth()+1)).slice(-2);
    street.value = data.street;
    housenumber.value = data.housenumber;
    code.value = data.code;
    city.value = data.city;
    optionalAdress.value = data.optionaladress;
    mobilenumber.value = data.mobilenumber;
    accept.checked = data.accept;
    if (data.payment === "middle") {
      payment[0].checked = true;
    }
    if (data.payment === "quarterly") {
      payment[1].checked = true;
    }
    if (data.payment === "semiannual") {
      payment[2].checked = true;
    }
    if (data.payment === "yearly") {
      payment[3].checked = true;
    }
    if (data.payment_via === "direct-debit") {
      payment_via[0].checked = true;
    }
    if (data.payment_via === "bank-transfer") {
      payment_via[1].checked = true;
    }
    sname.value = data.sname;
    fname.value = data.fname;
    street_mandat.value = data.street_mandat;
    housenumber_mandat.value = data.housenumber_mandat;
    code_mandat.value = data.code_mandat;
    city_mandat.value = data.city_mandat;
    iban_mandat.value = data.iban_mandat;
    bic_mandat.value = data.bic_mandat;
    institut_mandat.value = data.institut_mandat;
    ort_mandat.value = data.ort_mandat;
    accept_mandat.checked = data.accept_mandat;
  }).catch(err => {

  })
})








function urlHash() {
  return parseInt(window.location.hash.substring(1));
}

function genderValid() {
  return (mann.checked || frau.checked);
}

function firstnameValid() {
  return firstname.value.match(/^[a-zA-ZÄÖÜäöüß]+$/) && firstname.value.length <= 19;
}

function secondnameValid() {
  return secondname.value.match(/^[a-zA-ZÄÖÜäöüß]+$/) && secondname.value.length <= 28;
}

function birthdayValid() {
  var eighteenYearsAgo = moment().subtract(18, "years")
  return (eighteenYearsAgo.isAfter(moment(birthday.value)) && (birthday.value.match(/-/g) || []).length === 2);
}

function startDayValid() {
  return (Date.parse(startDay.value) <= Date.parse(new Date()) && (startDay.value.match(/-/g) || []).length === 1);
}

function housenumberValid() {
  return housenumber.value.match(/^[0-9]+[a-z]*$/)  && housenumber.value.length <= 5;
}

function streetValid() {
  return street.value !== "" && street.value.length <= 22;
}

function codeValid() {
  return code.value.match(/^[0-9]{5}$/);
}

function cityValid() {
  return city.value !== "" && city.value.length <= 22;
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
  return fname.value.match(/^[a-zA-ZÄÖÜäöüß]+$/) && fname.value.length + sname.value.length <= 27;
}

function snameValid() {
  return sname.value.match(/^[a-zA-ZÄÖÜäöüß]+$/) && fname.value.length + sname.value.length <= 27;
}

function street_mandatValid() {
  return street_mandat.value !== "" && street_mandat.value.length <= 22;
}

function housenumber_mandatValid() {
  return housenumber_mandat.value.match(/^[0-9]+[a-z]*$/) && housenumber_mandat.value.length <= 5;
}

function code_mandatValid() {
  return code_mandat.value.match(/^[0-9]{5}$/);
}

function city_mandatValid() {
  return city_mandat.value.match(/^[a-zA-Z]+$/)  && city_mandat.value.length <= 22;
}

function iban_mandatValid() {
  return iban_mandat.value.match(/^[a-zA-Z]{2}[0-9]{2}[a-zA-Z0-9]{4}[0-9]{7}([a-zA-Z0-9]?){0,16}$/);
}

function bic_mandatValid() {
  return bic_mandat.value.match(/^([a-zA-Z]{4}[a-zA-Z]{2}[a-zA-Z0-9]{2}([a-zA-Z0-9]{3})?)$/);
}

function institut_mandatValid() {
  return institut_mandat.value !== ""  && institut_mandat.value.length <= 16;
}

function ort_mandatValid() {
  return ort_mandat.value !== ""  && ort_mandat.value.length <= 22;
}

function accept_mandatValid() {
  return accept_mandat.checked;
}

function optionalAdressValid() {
  if (optionalAdress.value !== "") {
    if (optionalAdress.value.length > 22) {
      return false;
    }else{
      return true;
    }
  }else{
    return true;
  }
}

function mobilenumberValid() {
  if (mobilenumber.value !== "") {
    if (mobilenumber.value.length > 17) {
      return false;
    }else{
      return true;
    }
  }else{
    return true;
  }
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
      return (streetValid() && housenumberValid() && codeValid() && cityValid());
    case 3:
      return optionalAdressValid();
    case 4:
      return mobilenumberValid();
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