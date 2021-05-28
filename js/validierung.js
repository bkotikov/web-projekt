const email = document.getElementById("emailAdresse");
const pass = document.getElementById("passwort");

const emailFehler = document.getElementById("emailFehlermeldung");
const passFehler = document.getElementById("passwortFehlermeldung");

email.oninput = function () { validiereEmail(this.value) };
pass.oninput = function () { validierePasswort(this.value) };
var fehler = false;
function validiereEmail(email) {
  //var mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  var mailformat = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
  if (!email.trim().match(mailformat)) {
    emailFehler.style.display = "block";
    if (fehler !== true) {
      fehler = true;
    }
  } else if (email.trim().match(mailformat)) {
    if (fehler !== false) fehler = false;
    emailFehler.style.display = "none";
  }
}
var passwortFehler = false;
function validierePasswort(value) {
  var passwortRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,}$/;

  if (!value.trim().match(passwortRegex)) {
    passFehler.style.display = "block";
    if (passwortFehler !== true) {
      passwortFehler = true;
    }
  } else if (value.trim().match(passwortRegex)) {
    if (passwortFehler !== false) { passwortFehler = false; }
    passFehler.style.display = "none";
  }
}

var plz = document.getElementById("postleitzahl");
if (plz) {
  plz.oninput = function () { validierePlz(this.value) };
}

var plzFehler = false;
var plzFehlerEl = document.getElementById("plzFehlermeldung");
function validierePlz(value) {
  var plzFormat = /^[0-9]{5}$/;
  if (!value.trim().match(plzFormat) && value.length > 0) {
    plzFehlerEl.style.display = "block";
    if (plzFehler !== true) plzFehler = true;
  } else if (value.trim().match(plzFormat)) {
    plzFehlerEl.style.display = "none";
    if (plzFehler !== false) plzFehler = false;
  }
}

var hFehler = false;
var hausnummer = document.getElementById("hausnummer");
var hNummerFehler = document.getElementById("hnumberFehlermeldung");
if (hausnummer) {
  hausnummer.oninput = function () { validiereHausNummer(this.value) };
}


function validiereHausNummer(value) {

  var hausnummerFormat = /^[0-9]+$/;
  if (!value.trim().match(hausnummerFormat) && value.length > 0) {
    hNummerFehler.style.display = "block";
    if (hFehler !== true) hFehler = true;
  } else if (value.trim().match(hausnummerFormat)) {
    hNummerFehler.style.display = "none";
    if (hFehler !== false) hFehler = false;
  }
}
function passwortVerschluesseln(passwort) {

  function rotate_left(n, s) {
    var t4 = (n << s) | (n >>> (32 - s));
    return t4;
  };

  function lsb_hex(val) {
    var str = '';
    var i;
    var vh;
    var vl;
    for (i = 0; i <= 6; i += 2) {
      vh = (val >>> (i * 4 + 4)) & 0x0f;
      vl = (val >>> (i * 4)) & 0x0f;
      str += vh.toString(16) + vl.toString(16);
    }
    return str;
  };

  function cvt_hex(val) {
    var str = '';
    var i;
    var v;
    for (i = 7; i >= 0; i--) {
      v = (val >>> (i * 4)) & 0x0f;
      str += v.toString(16);
    }
    return str;
  };

  function Utf8Encode(string) {
    string = string.replace(/\r\n/g, '\n');
    var utftext = '';
    for (var n = 0; n < string.length; n++) {
      var c = string.charCodeAt(n);
      if (c < 128) {
        utftext += String.fromCharCode(c);
      }
      else if ((c > 127) && (c < 2048)) {
        utftext += String.fromCharCode((c >> 6) | 192);
        utftext += String.fromCharCode((c & 63) | 128);
      }
      else {
        utftext += String.fromCharCode((c >> 12) | 224);
        utftext += String.fromCharCode(((c >> 6) & 63) | 128);
        utftext += String.fromCharCode((c & 63) | 128);
      }
    }
    return utftext;
  };

  var blockstart;
  var i, j;
  var W = new Array(80);
  var H0 = 0x67452301;
  var H1 = 0xEFCDAB89;
  var H2 = 0x98BADCFE;
  var H3 = 0x10325476;
  var H4 = 0xC3D2E1F0;
  var A, B, C, D, E;
  var temp;
  passwort = Utf8Encode(passwort);
  var msg_len = passwort.length;
  var word_array = new Array();
  for (i = 0; i < msg_len - 3; i += 4) {
    j = passwort.charCodeAt(i) << 24 | passwort.charCodeAt(i + 1) << 16 |
      passwort.charCodeAt(i + 2) << 8 | passwort.charCodeAt(i + 3);
    word_array.push(j);
  }
  switch (msg_len % 4) {
    case 0:
      i = 0x080000000;
      break;
    case 1:
      i = passwort.charCodeAt(msg_len - 1) << 24 | 0x0800000;
      break;
    case 2:
      i = passwort.charCodeAt(msg_len - 2) << 24 | msg.charCodeAt(msg_len - 1) << 16 | 0x08000;
      break;
    case 3:
      i = passwort.charCodeAt(msg_len - 3) << 24 | msg.charCodeAt(msg_len - 2) << 16 | msg.charCodeAt(msg_len - 1) << 8 | 0x80;
      break;
  }
  word_array.push(i);
  while ((word_array.length % 16) != 14) word_array.push(0);
  word_array.push(msg_len >>> 29);
  word_array.push((msg_len << 3) & 0x0ffffffff);
  for (blockstart = 0; blockstart < word_array.length; blockstart += 16) {
    for (i = 0; i < 16; i++) W[i] = word_array[blockstart + i];
    for (i = 16; i <= 79; i++) W[i] = rotate_left(W[i - 3] ^ W[i - 8] ^ W[i - 14] ^ W[i - 16], 1);
    A = H0;
    B = H1;
    C = H2;
    D = H3;
    E = H4;
    for (i = 0; i <= 19; i++) {
      temp = (rotate_left(A, 5) + ((B & C) | (~B & D)) + E + W[i] + 0x5A827999) & 0x0ffffffff;
      E = D;
      D = C;
      C = rotate_left(B, 30);
      B = A;
      A = temp;
    }
    for (i = 20; i <= 39; i++) {
      temp = (rotate_left(A, 5) + (B ^ C ^ D) + E + W[i] + 0x6ED9EBA1) & 0x0ffffffff;
      E = D;
      D = C;
      C = rotate_left(B, 30);
      B = A;
      A = temp;
    }
    for (i = 40; i <= 59; i++) {
      temp = (rotate_left(A, 5) + ((B & C) | (B & D) | (C & D)) + E + W[i] + 0x8F1BBCDC) & 0x0ffffffff;
      E = D;
      D = C;
      C = rotate_left(B, 30);
      B = A;
      A = temp;
    }
    for (i = 60; i <= 79; i++) {
      temp = (rotate_left(A, 5) + (B ^ C ^ D) + E + W[i] + 0xCA62C1D6) & 0x0ffffffff;
      E = D;
      D = C;
      C = rotate_left(B, 30);
      B = A;
      A = temp;
    }
    H0 = (H0 + A) & 0x0ffffffff;
    H1 = (H1 + B) & 0x0ffffffff;
    H2 = (H2 + C) & 0x0ffffffff;
    H3 = (H3 + D) & 0x0ffffffff;
    H4 = (H4 + E) & 0x0ffffffff;
  }
  var temp = cvt_hex(H0) + cvt_hex(H1) + cvt_hex(H2) + cvt_hex(H3) + cvt_hex(H4);

  pass.value = temp.toLowerCase();
  console.log(temp.toLowerCase());

}

document.querySelector('#registrierung form').addEventListener('submit', function (e) {
  if (fehler) {
    e.preventDefault();
  } else if (plzFehler) {
    e.preventDefault();
  } else if (passwortFehler) {
    e.preventDefault();
  } else {
    passwortVerschluesseln(pass.value);
  }
});
