function validate(params) {
    if (Object.keys(params).length === 0) {
      return false;
    }
    const {page, gender, firstname, secondname, birthday, startDay, street, housenumber, optionalAdress, mobilenumber, accept, payment, payment_via, 
        sname, fname, street_mandat, housenumber_mandat, code_mandat, city_mandat, iban_mandat, bic_mandat, institut_mandat, ort_mandat, accept_mandat} = params;
    
        valid = true;
        switch (page - 1) {
            case 0:
              if ((gender !== "men" && gender !== "women") || firstname === "" || secondname === "" ||  Date.parse(birthday) > Date.parse(new Date())) {
                valid = false;
              }
              break;
            case 1:
              if (Date.parse(startDay) > Date.parse(new Date)) {
                valid = false;
              }
              break;
            case 2:
              if (street.value === "" || !housenumber.match(/^[0-9]+[a-z]*$/)) {
                valid = false;
              }
              break;
            case 3:
              break;
            case 4:
                break;
            case 5:
              if (accept !== "on") {
                valid = false;
              } 
              break;
            case 6:
              if (payment !== "middle" && payment !== "quarterly" && payment !== "semiannual" && payment !== "yearly") {
                valid = false;
              }
              break;
            case 7:
              if (payment_via !== "direct-debit" && payment_via !== "bank-transfer") {
                valid = false;
              }
              break;
            case 8:
              if (fname === "" || sname === "") {
                valid = false;
              }
              break;
            case 9:
              if (street_mandat === "" || !housenumber_mandat.match(/^[0-9]+[a-z]*$/) || !code_mandat.match(/^[0-9]{5}$/) || city_mandat === "") {
                valid = false;
              }
              break;
            case 10:
              if (!iban_mandat.match(/^[a-zA-Z]{2}[0-9]{2}[a-zA-Z0-9]{4}[0-9]{7}([a-zA-Z0-9]?){0,16}$/) || !bic_mandat.match(/^([a-zA-Z]{4}[a-zA-Z]{2}[a-zA-Z0-9]{2}([a-zA-Z0-9]{3})?)$/) || institut_mandat === "" || ort_mandat === "") {
                valid = false;
              } 
              break;
            case 11:
              if (accept_mandat !== "on") {
                valid = false;
              }
              break;
            default:
              break;
          }
          return valid;

}

module.exports = {
    validate,
}