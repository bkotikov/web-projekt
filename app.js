const express = require('express');
const app = express();

const http = require('http');
const { dirname } = require('path');
const path    = require("path");
const parser = require('accept-language-parser');
const url = require('url');

const PORT = 5000;

//Sprachen, die im URL eingesetzt werden
const en = 'en';
const ru = 'ru';
const de = 'de';
const bgr = 'bgr';

var language = '';

app.use('/static/css', express.static(__dirname + '/assets/css'));
app.use('/static/images', express.static(__dirname + '/assets/images'));
app.use('/static/js', express.static(__dirname + '/js'));




//root
app.get('/',function(req,res){ 
  res.sendFile(path.join(__dirname+'/html/lang.html'));
});

//----Cookie------

app.get('/de/cookie',function(req,res){
  res.sendFile(path.join(__dirname+'/html/de/cookie.html'));
});

app.get('/en/cookie',function(req,res){
  res.sendFile(path.join(__dirname+'/html/en/cookie.html'));
});

app.get('/ru/cookie',function(req,res){
  res.sendFile(path.join(__dirname+'/html/ru/cookie.html'));
});

app.get('/bgr/cookie',function(req,res){
  res.sendFile(path.join(__dirname+'/html/bgr/BG_cookie.html'));
});

//----Cookie------


//----Banner------

app.get('/de/banner',function(req,res){
  res.sendFile(path.join(__dirname+'/html/de/banner.html'));
});
app.get('/en/banner',function(req,res){
  res.sendFile(path.join(__dirname+'/html/en/banner.html'));
});
app.get('/ru/banner',function(req,res){
  res.sendFile(path.join(__dirname+'/html/ru/banner.html'));
});
app.get('/bgr/banner',function(req,res){
  res.sendFile(path.join(__dirname+'/html/bgr/BG_banner.html'));
});

//----Banner------



app.get('/de/scan',function(req,res){
  res.sendFile(path.join(__dirname+'/html/de/scan.html'));
});


//----Index------

app.get('/en',function(req,res){
  res.sendFile(path.join(__dirname+'/html/en/index.html'));
});
app.get('/de',function(req,res){
  res.sendFile(path.join(__dirname+'/html/de/index.html'));
});
app.get('/ru',function(req,res){
  res.sendFile(path.join(__dirname+'/html/ru/index.html'));
});
app.get('/bgr',function(req,res){
  res.sendFile(path.join(__dirname+'/html/bgr/BG_index.html'));
});

//----Index------


//----Login------

app.get('/de/login', function(req,res) {
  res.sendFile(path.join(__dirname + '/html/de/login.html'));
});
app.get('/en/login', function(req,res) {
  res.sendFile(path.join(__dirname + '/html/en/login.html'));
});
app.get('/ru/login', function(req,res) {
  res.sendFile(path.join(__dirname + '/html/ru/login.html'));
});
app.get('/bgr/login', function(req,res) {
  res.sendFile(path.join(__dirname + '/html/bgr/BG_login.html'));
});

app.get('/de/registration', function(req, res){
  res.sendFile(path.join(__dirname + '/html/de/registration.html'))
});

//----Login------


//----Registration-----

app.get('/de/registration', function(req, res){
  res.sendFile(path.join(__dirname + '/html/de/registration.html'))
});
app.get('/ru/registration', function(req, res){
  res.sendFile(path.join(__dirname + '/html/ru/registration.html'))
});
app.get('/en/registration', function(req, res){
  res.sendFile(path.join(__dirname + '/html/en/registration.html'))
});
app.get('/bgr/registration', function(req, res){
  res.sendFile(path.join(__dirname + '/html/bgr/BG_registration.html'))
});

//----Registration-----


//----About-----

app.get('/de/about', function(req, res){
  res.sendFile(path.join(__dirname + '/html/de/about.html'))
});
app.get('/ru/about', function(req, res){
  res.sendFile(path.join(__dirname + '/html/ru/about.html'))
});
app.get('/en/about', function(req, res){
  res.sendFile(path.join(__dirname + '/html/en/about.html'))
});
app.get('/bgr/about', function(req, res){
  res.sendFile(path.join(__dirname + '/html/bgr/BG_about.html'))
});

//----About-----


app.get('/de/privacy', function(req, res){
  res.sendFile(path.join(__dirname + '/html/de/privacy.html'))
});
app.get('/ru/privacy', function(req, res){
  res.sendFile(path.join(__dirname + '/html/ru/privacy.html'))
});
app.get('/en/privacy', function(req, res){
  res.sendFile(path.join(__dirname + '/html/en/privacy.html'))
});
app.get('/bgr/privacy', function(req, res){
  res.sendFile(path.join(__dirname + '/html/bgr/BG_privacy.html'))
});



//-----Imprint----

app.get('/de/imprint', function(req, res){
  res.sendFile(path.join(__dirname + '/html/de/imprint.html'))
});
app.get('/ru/imprint', function(req, res){
  res.sendFile(path.join(__dirname + '/html/ru/imprint.html'))
});
app.get('/en/imprint', function(req, res){
  res.sendFile(path.join(__dirname + '/html/en/imprint.html'))
});
app.get('/bgr/imprint', function(req, res){
  res.sendFile(path.join(__dirname + '/html/bgr/BG_imprint.html'))
});

//-----Imprint----



//-----GEZ-----

app.get('/de/gez', function(req, res){
  res.sendFile(path.join(__dirname + '/html/de/gez.html'))
});
app.get('/ru/gez', function(req, res){
  res.sendFile(path.join(__dirname + '/html/ru/gez.html'))
});
app.get('/en/gez', function(req, res){
  res.sendFile(path.join(__dirname + '/html/en/gez.html'))
});
app.get('/bgr/gez', function(req, res){
  res.sendFile(path.join(__dirname + '/html/bgr/gez.html'))
});

//-----GEZ-----

app.post('/de/loginPruefen', function(req,res){
  res.sendFile(path.join(__dirname+'/html/de/index.html'));
});
app.post('/en/loginPruefen', function(req,res){
  res.sendFile(path.join(__dirname+'/html/en/index.html'));
});
app.post('/ru/loginPruefen', function(req,res){
  res.sendFile(path.join(__dirname+'/html/ru/index.html'));
});
app.post('/bgr/loginPruefen', function(req,res){
  res.sendFile(path.join(__dirname+'/html/bgr/BG_index.html'));
});






app.post('/de/registrierungPruefen', function(req,res){
  res.sendFile(path.join(__dirname+'/html/de/index.html'));
});
app.post('/en/registrierungPruefen', function(req,res){
  res.sendFile(path.join(__dirname+'/html/en/index.html'));
});
app.post('/ru/registrierungPruefen', function(req,res){
  res.sendFile(path.join(__dirname+'/html/ru/index.html'));
});
app.post('/bgr/registrierungPruefen', function(req,res){
  res.sendFile(path.join(__dirname+'/html/bgr/BG_index.html'));
});

app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));
