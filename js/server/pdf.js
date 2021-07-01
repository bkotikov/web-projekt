const { degrees, PDFDocument, rgb, StandardFonts } = require('pdf-lib');
const fontkit = require('@pdf-lib/fontkit');
const fs = require('fs')


async function modifyPdf(data) {
    console.log("data:")
    console.log(data)
  
    const {page, gender, firstname, secondname, birthday, startDay, street, housenumber, code, city, optionalAdress, mobilenumber, accept, payment, payment_via, 
        sname, fname, street_mandat, housenumber_mandat, code_mandat, city_mandat, iban_mandat, bic_mandat, institut_mandat, ort_mandat, accept_mandat} = data;
    const uint8Array = fs.readFileSync('gez.pdf');
    console.log("type: " + optionalAdress);
  
    const pdfDoc = await PDFDocument.load(uint8Array);
    pdfDoc.registerFontkit(fontkit)
    const firstPage = pdfDoc.getPage(0);
    const secondPage = pdfDoc.getPage(1);
    const { width, height } = firstPage.getSize();
    var abstand = 14.2;



    const form = pdfDoc.getForm()
    
    if (gender === "woman") {
      
      firstPage.drawLine({
        start: { x: width / 2 + 36, y: height - 167 },
        end: { x: width / 2 + 36 + 10, y: height - 177 },
      })
      firstPage.drawLine({
        start: { x: width / 2 + 36 + 10, y: height - 167 },
        end: { x: width / 2 + 36, y: height - 177 },
      })
    }


    if (gender === "men") {
      
      firstPage.drawLine({
        start: { x: width / 2 + 36 + 57, y: height - 167 },
        end: { x: width / 2 + 36 + 10 + 57, y: height - 177 },
      })
      firstPage.drawLine({
        start: { x: width / 2 + 36 + 10 + 57, y: height - 167 },
        end: { x: width / 2 + 36 + 57, y: height - 177 },
      })
    }


    form.getTextField("TitelNachname").setText(secondname)

    form.getTextField("Vorname").setText(firstname)


    var bday = new Date(birthday)
    var date = ('0' + bday.getDate()).slice(-2) + ('0' + (bday.getMonth()+1)).slice(-2) + bday.getFullYear();
    form.getTextField("Geburtsdatum").setText(date)

    console.log(startDay + "-01")
    var sday = new Date(startDay + "-01")
    var startdate = ('0' + (sday.getMonth()+1)).slice(-2) + sday.getFullYear();
    form.getTextField("Anmeldedatum").setText(startdate);

    form.getTextField("Adresszusatz").setText(optionalAdress)

    form.getTextField("Straße").setText(street)

    form.getTextField("Hausnummer").setText(housenumber)

    form.getTextField("PLZ").setText(code.toString())

    form.getTextField("Ort").setText(city)

    form.getTextField("Telefonnummer").setText(mobilenumber)

    var datenow = new Date();
    var datenowstring = ('0' + datenow.getDate()).slice(-2) + ('0' + (datenow.getMonth()+1)).slice(-2) + datenow.getFullYear();
    form.getTextField("Datum").setText(datenowstring)

    if (payment === "middle") {
      secondPage.drawLine({
        start: { x: 65.5, y: height - 116 },
        end: { x: 65.5 + 10, y: height - 126 },
      })
      secondPage.drawLine({
        start: { x: 65.5 + 10, y: height - 116 },
        end: { x: 65.5, y: height - 126 },
      })
    }

    if (payment === "quarterly") {
      secondPage.drawLine({
        start: { x: 65.5 + 125, y: height - 116 },
        end: { x: 65.5 + 10 + 125, y: height - 126 },
      })
      secondPage.drawLine({
        start: { x: 65.5 + 10 + 125, y: height - 116 },
        end: { x: 65.5 + 125, y: height - 126 },
      })
    }

    if (payment === "semiannual") {
      secondPage.drawLine({
        start: { x: 65.5 + 230, y: height - 116 },
        end: { x: 65.5 + 10 + 230, y: height - 126 },
      })
      secondPage.drawLine({
        start: { x: 65.5 + 10 + 230, y: height - 116 },
        end: { x: 65.5 + 230, y: height - 126 },
      })
    }

    if (payment === "yearly") {
      secondPage.drawLine({
        start: { x: 65.5 + 325, y: height - 116 },
        end: { x: 65.5 + 10 + 325, y: height - 126 },
      })
      secondPage.drawLine({
        start: { x: 65.5 + 10 + 325, y: height - 116 },
        end: { x: 65.5 + 325, y: height - 126 },
      })
    }

    if (payment_via === "bank-transfer") {
      secondPage.drawLine({
        start: { x: 65.5 + 88, y: height - 153 },
        end: { x: 65.5 + 10 + 88, y: height - 163 },
      })
      secondPage.drawLine({
        start: { x: 65.5 + 10 + 88, y: height - 153 },
        end: { x: 65.5 + 88, y: height - 163 },
      })
    }

    if (payment_via === "direct-debit") {
      secondPage.drawLine({
        start: { x: 65.5, y: height - 153 },
        end: { x: 65.5 + 10, y: height - 163 },
      })
      secondPage.drawLine({
        start: { x: 65.5 + 10, y: height - 153 },
        end: { x: 65.5, y: height - 163 },
      })
      var sfstring = sname + "/" + fname;
      form.getTextField("NameLastschrift").setText(sfstring)

      form.getTextField("Straße_Lastschrift").setText(street_mandat)


      
      
      
      
      
      
      
      
      

      form.getTextField("HausnummerLastschrift").setText(housenumber_mandat)

      form.getTextField("PLZLastschrift").setText(code_mandat.toString())

      form.getTextField("OrtLastschrift").setText(ort_mandat)

      form.getTextField("IBAN").setText(iban_mandat)

      form.getTextField("BIC").setText(bic_mandat)

      form.getTextField("Kreditinstitut").setText(institut_mandat)


      
      form.getTextField("OrtUnterschrift").setText(city)
      

      form.getTextField("DatumLastschrift").setText(datenowstring)

    }


    
      
    form.flatten();
    const pdfBytes = await pdfDoc.save();
    return pdfBytes;
  }

  module.exports = {
    modifyPdf
}