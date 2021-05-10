document.getElementById("emailAdresse").onchange = function() {validiereEmail(this.value)};

function validiereEmail(email){
  var mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  if (!email.match(mailformat)){
    document.getElementById("emailFehlermeldung").style.display = "block";
    event.preventDefault();
  }else {
    document.getElementById("emailFehlermeldung").style.display = "none";
  }
}
