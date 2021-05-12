const express = require('express');
const app = express();

const http = require('http');
const { dirname } = require('path');
const path    = require("path");
const parser = require('accept-language-parser');
const url = require('url');

const PORT = 3000;

//Sprachen, die im URL eingesetzt werden
const en = 'en';
const ru = 'ru';
const de = 'de';
const bgr = 'bgr';

var language = '';

app.use('/static/css', express.static(__dirname + '/assets/css'));
app.use('/static/images', express.static(__dirname + '/assets/images'));
app.use('/static/js', express.static(__dirname + '/js'));


// res.sendFile(path.join(__dirname+'/html/de/index.html'));

app.get('/',function(req,res){
  //language = parser.pick([en, ru, de, bgr], req.headers['accept-language']);
  res.sendFile(path.join(__dirname+'/html/lang.html'));
});


app.get('/de/scan',function(req,res){
  res.sendFile(path.join(__dirname+'/html/de/scan.html'));
});

app.get('/en',function(req,res){
  res.sendFile(path.join(__dirname+'/html/en/index.html'));
});

app.get('/ru',function(req,res){
  res.sendFile(path.join(__dirname+'/html/ru/RU_index.html'));
});

app.get('/de',function(req,res){
  res.sendFile(path.join(__dirname+'/html/de/index.html'));
});

app.get('/bgr',function(req,res){
  res.sendFile(path.join(__dirname+'/html/bgr/index.html'));
});

app.get('/login/de', function(req,res) {
  res.sendFile(path.join(__dirname + '/html/de/login.html'));
});

app.get('/registration/de', function(req, res){
  res.sendFile(path.join(__dirname + '/html/de/registration.html'))
});


app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));
