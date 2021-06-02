const express = require('express');
const bodyParser = require('body-parser')
const fs = require('fs')
const requirejs = require('requirejs');
const app = express();

const http = require('http');
const { dirname } = require('path');
const path = require("path");
const parser = require('accept-language-parser');
const url = require('url');
const cookieParser = require('cookie-parser');

const db = require('./js/db.js')

const PORT = 5000;

//Sprachen, die im URL eingesetzt werden
const en = 'en';
const en_index = 'EN_';
const ru = 'ru';
const ru_index = 'RU_';
const de = 'de';
const de_index = 'DE_';
const bg = 'bg';
const bg_index = 'BG_';

var language = '';


app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)
//app.use(cookieParser());

app.use('/static/css', express.static(__dirname + '/assets/css'));
app.use('/static/images', express.static(__dirname + '/assets/images'));
app.use('/static/js', express.static(__dirname + '/js'));

//root
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/html/lang.html'));
});

//----Cookie------

app.get('/' + de + '/cookie', function (req, res) {
  res.sendFile(path.join(__dirname + '/html/' + de + '/' + de_index + 'cookie.html'));
});

app.get('/' + en + '/cookie', function (req, res) {
  res.sendFile(path.join(__dirname + '/html/' + en + '/' + en_index + 'cookie.html'));
});

app.get('/' + ru + '/cookie', function (req, res) {
  res.sendFile(path.join(__dirname + '/html/' + ru + '/' + ru_index + 'cookie.html'));
});

app.get('/' + bg + '/cookie', function (req, res) {
  res.sendFile(path.join(__dirname + '/html/' + bg + '/' + bg_index + 'cookie.html'));
});

//----Cookie------


//----Banner------

app.get('/' + de + '/banner', function (req, res) {
  res.sendFile(path.join(__dirname + '/html/' + de + '/' + de_index + 'banner.html'));
});
app.get('/' + en + '/banner', function (req, res) {
  res.sendFile(path.join(__dirname + '/html/' + en + '/' + en_index + 'banner.html'));
});
app.get('/' + ru + '/banner', function (req, res) {
  res.sendFile(path.join(__dirname + '/html/' + ru + '/' + ru_index + 'banner.html'));
});
app.get('/' + bg + '/banner', function (req, res) {
  res.sendFile(path.join(__dirname + '/html/' + bg + '/' + bg_index + 'banner.html'));
});

//----Banner------

//----Scanner------

app.get('/' + de + '/scan', function (req, res) {
  res.sendFile(path.join(__dirname + '/html/' + de + '/' + de_index + 'scan.html'));
});

app.get('/' + en + '/scan', function (req, res) {
  res.sendFile(path.join(__dirname + '/html/' + en + '/' + en_index + 'scan.html'));
});

app.get('/' + ru + '/scan', function (req, res) {
  res.sendFile(path.join(__dirname + '/html/' + ru + '/' + ru_index + 'scan.html'));
});

app.get('/' + bg + '/scan', function (req, res) {
  res.sendFile(path.join(__dirname + '/html/' + bg + '/' + bg_index + 'scan.html'));
});

//----Scanner------


//----Index------

app.get('/' + en + '/', function (req, res) {
  res.sendFile(path.join(__dirname + '/html/' + en + '/' + en_index + 'index.html'));
});
app.get('/' + de + '/', function (req, res) {
  res.sendFile(path.join(__dirname + '/html/' + de + '/' + de_index + 'index.html'));
});
app.get('/' + ru + '/', function (req, res) {
  res.sendFile(path.join(__dirname + '/html/' + ru + '/' + ru_index + 'index.html'));
});
app.get('/' + bg + '/', function (req, res) {
  res.sendFile(path.join(__dirname + '/html/' + bg + '/' + bg_index + 'index.html'));
});

//----Index------


//----Login------

app.get('/' + de + '/login', function (req, res) {
  res.sendFile(path.join(__dirname + '/html/' + de + '/' + de_index + 'login.html'));
});
app.get('/' + en + '/login', function (req, res) {
  res.sendFile(path.join(__dirname + '/html/' + en + '/' + en_index + 'login.html'));
});
app.get('/' + ru + '/login', function (req, res) {
  res.sendFile(path.join(__dirname + '/html/' + ru + '/' + ru_index + 'login.html'));
});
app.get('/' + bg + '/login', function (req, res) {
  res.sendFile(path.join(__dirname + '/html/' + bg + '/' + bg_index + 'login.html'));
});

//----Login------


//----Registration-----

app.get('/' + de + '/registration', function (req, res) {
  res.sendFile(path.join(__dirname + '/html/' + de + '/' + de_index + 'registration.html'))
});
app.get('/' + ru + '/registration', function (req, res) {
  res.sendFile(path.join(__dirname + '/html/' + ru + '/' + ru_index + 'registration.html'))
});
app.get('/' + en + '/registration', function (req, res) {
  res.sendFile(path.join(__dirname + '/html/' + en + '/' + en_index + 'registration.html'))
});
app.get('/' + bg + '/registration', function (req, res) {
  res.sendFile(path.join(__dirname + '/html/' + bg + '/' + bg_index + 'registration.html'))
});

app.post('/registration', function (req, res) {
  const url = req.body;
  db.insertUser(url)
  .then(
    res => {
      if (typeof res === 'string') {
        res.send(res)
      } else {
        console.log("success");
        //db.getUserByEmail()
      }
    }
  ).catch(err => {
    if (typeof err === 'object') {
      if (err.redirect) {
        res.redirect(err.redirect);
      }
    }
  });
});


//----Registration-----


//----About-----

app.get('/' + de + '/about', function (req, res) {
  res.sendFile(path.join(__dirname + '/html/' + de + '/' + de_index + 'about.html'))
});
app.get('/' + ru + '/about', function (req, res) {
  res.sendFile(path.join(__dirname + '/html/' + ru + '/' + ru_index + 'about.html'))
});
app.get('/' + en + '/about', function (req, res) {
  res.sendFile(path.join(__dirname + '/html/' + en + '/' + en_index + 'about.html'))
});
app.get('/' + bg + '/about', function (req, res) {
  res.sendFile(path.join(__dirname + '/html/' + bg + '/' + bg_index + 'about.html'))
});

//----About-----


app.get('/' + de + '/privacy', function (req, res) {
  res.sendFile(path.join(__dirname + '/html/' + de + '/' + de_index + 'privacy.html'))
});
app.get('/' + ru + '/privacy', function (req, res) {
  res.sendFile(path.join(__dirname + '/html/' + ru + '/' + ru_index + 'privacy.html'))
});
app.get('/' + en + '/privacy', function (req, res) {
  res.sendFile(path.join(__dirname + '/html/' + en + '/' + en_index + 'privacy.html'))
});
app.get('/' + bg + '/privacy', function (req, res) {
  res.sendFile(path.join(__dirname + '/html/' + bg + '/' + bg_index + 'privacy.html'))
});



//-----Imprint----

app.get('/' + de + '/imprint', function (req, res) {
  res.sendFile(path.join(__dirname + '/html/' + de + '/' + de_index + 'imprint.html'))
});
app.get('/' + ru + '/imprint', function (req, res) {
  res.sendFile(path.join(__dirname + '/html/' + ru + '/' + ru_index + 'imprint.html'))
});
app.get('/' + en + '/imprint', function (req, res) {
  res.sendFile(path.join(__dirname + '/html/' + en + '/' + en_index + 'imprint.html'))
});
app.get('/' + bg + '/imprint', function (req, res) {
  res.sendFile(path.join(__dirname + '/html/' + bg + '/' + bg_index + 'imprint.html'))
});

//-----Imprint----



//-----GEZ-----

app.get('/' + de + '/gez', function (req, res) {
  res.sendFile(path.join(__dirname + '/html/' + de + '/' + de_index + 'gez.html'))
});
app.get('/' + ru + '/gez', function (req, res) {
  res.sendFile(path.join(__dirname + '/html/' + ru + '/' + ru_index + 'gez.html'))
});
app.get('/' + en + '/gez', function (req, res) {
  res.sendFile(path.join(__dirname + '/html/' + en + '/' + en_index + 'gez.html'))
});
app.get('/' + bg + '/gez', function (req, res) {
  res.sendFile(path.join(__dirname + '/html/' + bg + '/' + bg_index + 'gez.html'))
});

//-----GEZ-----

app.post('/' + de + '/loginPruefen', function (req, res) {
  res.sendFile(path.join(__dirname + '/html/' + de + '/' + de_index + 'index.html'));
});
app.post('/' + en + '/loginPruefen', function (req, res) {
  res.sendFile(path.join(__dirname + '/html/' + en + '/' + en_index + 'index.html'));
});
app.post('/' + ru + '/loginPruefen', function (req, res) {
  res.sendFile(path.join(__dirname + '/html/' + ru + '/' + ru_index + 'index.html'));
});
app.post('/' + bg + '/loginPruefen', function (req, res) {
  res.sendFile(path.join(__dirname + '/html/' + bg + '/' + bg_index + 'index.html'));
});






app.post('/' + de + '/registrierungPruefen', function (req, res) {
  res.sendFile(path.join(__dirname + '/html/' + de + '/' + de_index + 'index.html'));
});
app.post('/' + en + '/registrierungPruefen', function (req, res) {
  res.sendFile(path.join(__dirname + '/html/' + en + '/' + en_index + 'index.html'));
});
app.post('/' + ru + '/registrierungPruefen', function (req, res) {
  res.sendFile(path.join(__dirname + '/html/' + ru + '/' + ru_index + 'index.html'));
});
app.post('/' + bg + '/registrierungPruefen', function (req, res) {
  res.sendFile(path.join(__dirname + '/html/' + bg + '/' + bg_index + 'index.html'));
});

app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));
