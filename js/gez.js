
// HASH
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
    hash = urlHash() + 1;
    const inputs = $("#" + hash + " input");
    event.preventDefault();
    var formData = {};
    formData["page"] = hash;
    inputs.each(function() {
      if ($(this)[0].name === "gender" || $(this)[0].name === "accept" || $(this)[0].name === "payment" || $(this)[0].name === "accept-mandat" || $(this)[0].name === "payment-via") {
          if ($(this)[0].checked) {
            formData[$(this)[0].name] = $(this)[0].value;
          }else{
            if (formData[$(this)[0].name] === "" || formData[$(this)[0].name] === undefined) {
              formData[$(this)[0].name] = "";
            }
            
          }
      }else{
        formData[$(this)[0].name] = $(this)[0].value;
      }
      
    });
    

    $.ajax({
        type: "POST",
        url: "/gez",
        data: formData,
        encode: true
    }).done(done => {
      if (urlHash() == 11) {
        return;
      }
      if (urlHash() == 7 && payment_via[1].checked) {
        return;
      }  
      replaceUrlHash(true);
      getAndSetUrlParams(); 
    }).fail(fail => {
        
    });








      
    
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
const street = document.getElementById("street");
const housenumber = document.getElementById("housenumber");
const accept = document.getElementById("accept");
const payment = document.getElementsByName("payment");
const sname = document.getElementById("sname");
const fname = document.getElementById("fname");
const street_mandat = document.getElementById("street-mandat");
const housenumber_mandat = document.getElementById("housenumber-mandat");
const code_mandat = document.getElementById("code-mandat");
const city_mandat = document.getElementById("city-mandat");
const payment_via = document.getElementsByName("payment-via");
const iban_mandat = document.getElementById("iban-mandat");
const bic_mandat = document.getElementById("bic-mandat");
const institut_mandat = document.getElementById("institut-mandat");
const ort_mandat = document.getElementById("ort-mandat");

const accept_mandat = document.getElementById("accept-mandat");

/*
if (!mann.checked || !frau.checked) {
  next.style.background = "#888888";
}
*/

//console.log(window.location.hash.substring(1));

function urlHash() {
  return parseInt(window.location.hash.substring(1));
}





function getLength(params) {
  return params.length;
}

function validateFields() {
  switch (urlHash()) {
    case 0:
      if ((mann.checked || frau.checked) && firstname.value.length > 2 && secondname.value.length > 2 &&  birthday.valueAsNumber <= Date.parse(new Date())) {
        return true;
      }else{
        return false;
      }
    case 1:
      if (Date.parse(startDay.value) <= Date.parse(new Date)) {
        return true;
      }else{
        return false;
      }
    case 2:
      if (street.value !== "" && housenumber.value.match(/^[0-9]+[a-z]*$/)) {
        return true;
      }else{
        return false;
      }
    case 3:
      return true;
    case 4:
      return true;
    case 5:
      if (accept.checked) {
        return true;
      } else {
        return false;
      }
    case 6:
      for (const element of payment) {
        if (element.checked) {
          return true;
        }
      }
      return false;
    case 7:
      for (const element of payment_via) {
        if (element.checked) {
          return true;
        }
      }
      return false;
    case 8:
      if (fname.value !== "" && sname.value !== "") {
        return true;
      }else{
        return false;
      }
    case 9:
      if (street_mandat.value !== "" && housenumber_mandat.value.match(/^[0-9]+[a-z]*$/) && code_mandat.value.match(/^[0-9]{5}$/) && city_mandat.value !== "") {
        return true;
      }else{
        return false;
      }
    case 10:
      console.log(iban_mandat.value.match(/^[a-zA-Z]{2}[0-9]{2}[a-zA-Z0-9]{4}[0-9]{7}([a-zA-Z0-9]?){0,16}$/));
      console.log(bic_mandat.value.match(/^([a-zA-Z]{4}[a-zA-Z]{2}[a-zA-Z0-9]{2}([a-zA-Z0-9]{3})?)$/));
      if (iban_mandat.value.match(/^[a-zA-Z]{2}[0-9]{2}[a-zA-Z0-9]{4}[0-9]{7}([a-zA-Z0-9]?){0,16}$/) && bic_mandat.value.match(/^([a-zA-Z]{4}[a-zA-Z]{2}[a-zA-Z0-9]{2}([a-zA-Z0-9]{3})?)$/) && institut_mandat.value !== "" && ort_mandat.value !== "") {
        return true;
      } else {
        return false;
      }
      
    case 11:
      if (accept_mandat.checked) {
        return true;
      }else{
        return false;
      }
    default:
      break;
  }
}