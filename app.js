const express = require('express');
const session = require('express-session')
const bodyParser = require('body-parser')
const fs = require('fs')
const fse = require("fs-extra");
const multer = require('multer');

const formidable = require('formidable');
const app = express();

const https = require('https')
const http = require('http');
const { dirname } = require('path');
const path = require("path");
const parser = require('accept-language-parser');
const url = require('url');
const cookieParser = require('cookie-parser');

const db = require('./js/server/db.js');
const reg = require('./js/server/registration.js');
const login = require('./js/server/login.js');
const recog = require('./js/server/pictureRecognition.js');
const vali = require('./js/server/gez.js');
const pdf = require('./js/server/pdf.js');
const { validate } = require('uuid');
const nocache = require("nocache");

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

bodyParser.json();


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(nocache());

app.use('/static/css', express.static(__dirname + '/assets/css'));
app.use('/static/images', express.static(__dirname + '/assets/images'));
app.use('/static/js', express.static(__dirname + '/js'));
app.use('/static/html', express.static(__dirname + '/assets/static/'));
app.use(session({
  
  // It holds the secret key for session
  secret: 'thisisasecret',

  // Forces the session to be saved
  // back to the session store
  resave: true,

  // Forces a session that is "uninitialized"
  // to be saved to the store
  saveUninitialized: true
}))


//root
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/html/lang.html'));
});

app.post('/pdf', (req, res) => {
  var id = req.body.pdfid;
  db.getpdfdata(id)
    .then(result => {
      res.status(201).send(new Uint8Array(result.pdfdata.buffer));
    }).catch(error => {
      console.log(error);
    });
});

app.get('/archiv', function (req, res) {
  sess = req.session
  if (sess.benutzer_id == undefined) {
    res.redirect("/404");
  }

  //console.log(req.query.id);
  db.getFileByUserID(sess.benutzer_id)
    .then(result => {
      console.log(result);
      res.status(200).send(result);
    }).catch(error => {

    });
});









app.get('/' + de + '/archiv', function (req, res) {
  sess = req.session
  //console.log(req.cookies['benutzerid']);
  if (sess.benutzer_id !== undefined) {
    res.sendFile(path.join(__dirname + '/html/' + de + '/' + de_index + 'archiv.html'));
  } else {
    res.redirect("/404");
  }

});
app.get('/' + en + '/archiv', function (req, res) {
  if (sess.benutzer_id !== undefined) {
    res.sendFile(path.join(__dirname + '/html/' + en + '/' + en_index + 'archiv.html'));
  } else {
    res.redirect("/404");
  }
});
app.get('/' + ru + '/archiv', function (req, res) {
  if (sess.benutzer_id !== undefined) {
    res.sendFile(path.join(__dirname + '/html/' + ru + '/' + ru_index + 'archiv.html'));
  } else {
    res.redirect("/404");
  }
});
app.get('/' + bg + '/archiv', function (req, res) {
  if (sess.benutzer_id !== undefined) {
    res.sendFile(path.join(__dirname + '/html/' + bg + '/' + bg_index + 'archiv.html'));
  } else {
    res.redirect("/404");
  }
});

//----Cookie------

app.get('/' + de + '/cookie', function (req, res) {
  res.sendFile(path.join(__dirname + '/assets/static/' + de + '/' + 'cookie.html'));
});

app.get('/' + en + '/cookie', function (req, res) {
  res.sendFile(path.join(__dirname + '/assets/static/' + en + '/' + 'cookie.html'));
});

app.get('/' + ru + '/cookie', function (req, res) {
  res.sendFile(path.join(__dirname + '/assets/static/' + ru + '/' + 'cookie.html'));
});

app.get('/' + bg + '/cookie', function (req, res) {
  res.sendFile(path.join(__dirname + '/assets/static/' + bg + '/' + 'cookie.html'));
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



app.post('/scan', (req, res) => {
  var form = new formidable.IncomingForm();
  form.parse(req);
  form.on('file', function (name, file) {
    console.log('Uploaded ' + file.name);
    mimetype = file.type.split("/");
    if (mimetype[0] === "image" && (mimetype[1] === "bmp" || mimetype[1] === "jpg" || mimetype[1] === "png" || mimetype[1] === "pbm" || mimetype[1] === "jpeg")) {
      recog.reg(file.path).then(text => {
        if (text.includes("Neuanmeldung einer Wohnung")) {
          res.status(201).json({ form: "gez" });
        }else{
          console.log("fail reg");
          res.status(400).json({ fehler: "reg" });
        }
      }).catch(err => {
        res.status(400).json({ fehler: "reg" });
      });
    } else {
      console.log("Falsches File Format: " + file.type);
      res.status(400).json({ fehler: "type" });
    }
  });
});

//----Index------

app.get('/' + de + '/', function (req, res) {
  res.sendFile(path.join(__dirname + '/html/' + de + '/' + de_index + 'index.html'));
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

app.get('/logout/:lan', function (req, res) {
  sess = req.session


  if (sess.benutzer_id !== undefined) {
    sess.benutzer_id = undefined
  }
  if (req.params.lan == "bg") {
    res.redirect("/bg");
  }else if (req.params.lan == "en") {
    res.redirect("/en");
  }else if (req.params.lan == "de") {
    res.redirect("/de");
  }else if(req.params.lan == "ru") {
    res.redirect("/ru");
  }
});

app.get('/' + de + '/header', function (req, res) {
  sess = req.session
  if (sess.benutzer_id !== undefined) {
    res.sendFile(path.join(__dirname + '/assets/static/de/headerLogin.html'));
  } else {
    res.sendFile(path.join(__dirname + '/assets/static/de/header.html'));
  }
});
app.get('/' + en + '/header', function (req, res) {
  sess = req.session
  if (sess.benutzer_id !== undefined) {
    res.sendFile(path.join(__dirname + '/assets/static/en/headerLogin.html'));
  } else {
    res.sendFile(path.join(__dirname + '/assets/static/en/header.html'));
  }
});
app.get('/' + ru + '/header', function (req, res) {
  sess = req.session
  if (sess.benutzer_id !== undefined) {
    res.sendFile(path.join(__dirname + '/assets/static/ru/headerLogin.html'));
  } else {
    res.sendFile(path.join(__dirname + '/assets/static/ru/header.html'));
  }
});
app.get('/' + bg + '/header', function (req, res) {
  sess = req.session
  if (sess.benutzer_id !== undefined) {
    res.sendFile(path.join(__dirname + '/assets/static/bg/headerLogin.html'));
  } else {
    res.sendFile(path.join(__dirname + '/assets/static/bg/header.html'));
  }
});






app.get('/404', function (req, res) {
  res.sendFile(path.join(__dirname + '/html/404.html'));
});

//----Registration-----

app.get('/' + de + '/registration', function (req, res) {
  
    res.sendFile(path.join(__dirname + '/html/' + de + '/' + de_index + 'registration.html'));
  
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

app.post('/login', (request, response) => {
  sess = request.session;
  const url = request.body;
  request.setTimeout(0);
  login.signIn(url).then(result => {
      sess.benutzer_id = result.benutzer_id
      console.log("succesfully logged in");
      response.status(201).json({ success: true });
  }).catch(error => {
    response.status(400).json({ fail: true });
  });

});

app.post('/registration', (request, response) => {
  sess = request.session;
  const url = request.body;
  console.log(url);
  request.setTimeout(0);
  reg.signUp(url)
    .then(
      result => {
          sess.benutzer_id = result
          response.status(201).json({ success: true });
      }
    ).catch(err => {

      
        response.status(400).json({ fail: true });
      
    });
});


//----Registration-----
app.get('/gezData', (request, response) => {
  sess = request.session
  if (sess.benutzer_id !== undefined) {
    db.getAllDataGez(sess.benutzer_id).then(data => {
      if (data.length === 0) {
        response.status(400).json({ success: false });
      }else{
        console.log(typeof data[0].birthday)
        response.status(201).send(data[0]);
      }
      
    })
  }else{
    response.status(400).json({ success: false });
  }
  
})


app.post('/gez', (request, response) => {
  
  sess = request.session;
  const url = request.body;
  console.log("url: " + new Date(url.startDay))
  request.setTimeout(0);
  if (!vali.validate(url)) {
    console.log("not valid");
    response.status(400).json({ success: false });
  } else {
    sess.url = url;
    if (sess.benutzer_id !== undefined) {
      console.log("id vorhanden");
      benutzerid = sess.benutzer_id;
      db.getUserByUuid(benutzerid)
        .then(result => {
          if (result === undefined) {
            console.log("user falsch");
            response.status(400).json({ user: false });
          } else {
            console.log("user richtig");
            db.insertGez(url, benutzerid)
              .then(
                res => {
                  console.log("insert");
                  if (url.page === "7" && url.payment_via === "bank-transfer" || url.page === "11") {
                    
                      
                      pdf.modifyPdf(sess.url).then(text => {
                        db.insertPdf(sess.benutzer_id, text).then(res => {
                          
                        }).catch(err => {
                          console.log(err)
                        });
                        response.status(201).send(text);
                          
                      });
                    
                    
                  }else{
                    response.status(201).json({db: true});
                  }
                }
              )
              .catch(
                err => {
                  console.log(err);
                  response.status(400).json({ db: false });
                }
              );
          }
        })
        .catch(err => {
          console.log(err);
          response.status(400).json({ db: false });
        });

    } else {
      console.log("nicht angemeldet");
      sess.url = url
      if (url.page === "7" && url.payment_via === "bank-transfer" || url.page === "11") {
                    
                      
        pdf.modifyPdf(sess.url).then(text => {
          //console.log(text);
          response.status(201).send(text);  
        });
      
      
    }else{
      response.status(201).json({ success: true });
    }
      
      
      
    }

  }

});




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

http.createServer(app).listen(5000);
//app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));
