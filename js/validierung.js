document.getElementById("emailAdresse").onchange = function() {validiereEmail(this.value)};
var fehler = false;
function validiereEmail(email){
  //var mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  var mailformat = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
  console.log(email.match(mailformat));
  if (!email.match(mailformat)){
    document.getElementById("emailFehlermeldung").style.display = "block";
    if (fehler !== true) {
      fehler = true;
    }
  }else if (email.match(mailformat) || email.trim() === ""){
    if (fehler !== false) fehler =false;
    document.getElementById("emailFehlermeldung").style.display = "none";
  }
}

var plz = document.getElementById("postleitzahl");
if (plz){
  plz.onchange = function () {validierePlz(this.value)};
}

function validierePlz(value) {
  var plzFormat = /^[0-9]{5}$/;
  if(!value.match(plzFormat) && value.length > 0){
    document.getElementById("plzFehlermeldung").style.display = "block";
    if(fehler !== true)fehler = true;
  } else if (value.match(plzFormat) || value.trim() === ""){
    document.getElementById("plzFehlermeldung").style.display = "none";
    if (fehler !== false)fehler = false;
  }
}

document.querySelector('#registrierung form').addEventListener('submit', function(e) {
  console.log(fehler);
  if (fehler){
    console.log('prevented');
    e.preventDefault();
  }
});
