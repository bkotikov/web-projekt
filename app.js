const express = require('express');
const app = express();

const http = require('http');
const path    = require("path");

const PORT = 3000;

app.use('/static/css', express.static(__dirname + '/assets/css'));
app.use('/static/images', express.static(__dirname + '/assets/images'));
app.use('/static/js', express.static(__dirname + 'js'));

app.get('/',function(req,res){
  res.sendFile(path.join(__dirname+'/html/de/index.html'));
});

app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));
