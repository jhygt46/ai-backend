var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var CircularJSON = require('circular-json');

io.on('connection', function(a){ 
    console.log("CONECTION START"); 
    console.log(CircularJSON.stringify(a));
});

var fs = require('fs');
var helpers = require('./helpers');
var config = JSON.parse(fs.readFileSync('./config.json'));

http.listen(config.port, () => {
    fs.appendFile('init.log', 'Servidor iniciado a las ' + new Date().toLocaleString() + ' en puerto ' + config.port + '\n', function(err){ if(err) return console.log(err); console.log("SERVER START") });
});

app.get('/', function(req, res){

    var correo = "buena@nelson.com";
    io.emit('cambiar_precio', correo);

    res.setHeader('Content-Type', 'text/plain');
    res.end("Listo");
    
});