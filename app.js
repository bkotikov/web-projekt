const express = require('express');
const bodyParser = require('body-parser')
const fs = require('fs')
const app = express();

const https = require('https')
const http = require('http');
const { dirname } = require('path');
const path = require("path");
const parser = require('accept-language-parser');
const url = require('url');
const cookieParser = require('cookie-parser');

const db = require('./js/db.js');
const reg = require('./js/registration.js');
const success = require('./js/success.js');

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

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

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


app.get('/' + de + '/index', function (req, res) {
  res.sendFile(path.join(__dirname + '/html/' + de + '/indeex.html'));
});

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

app.post('/registration', (request, response) => {
  const url = request.body;
  request.setTimeout(0);
  reg.signUp(url)
    .then(
      result => {
        if (typeof result === 'string') {
          console.log(request.cookies.benutzerid);
          if (request.cookies.benutzerid) {
            console.log("cookie exist");
            response.status(400).json({ fail: true });
          } else {
            console.log(1);
            response.cookie('benutzerid', result, {maxAge: 1000 * 60 * 15, httpOnly: false});
            console.log("cookie: " + request.cookies['benutzerid']);
            response.status(201).json({ success: true });
          }
        } else {
          response.redirect('/');
        }
      }
    ).catch(err => {
      if (typeof err === 'object') {
        response.status(400).json({ fail: true });
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

https.createServer({
  key: fs.readFileSync('./key.pem'),
  cert: fs.readFileSync('./key-cert.pem')
}, app).listen(5001, () => {
  console.log('Listening... 5000')
})
http.createServer(app).listen(5000);
//app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));
