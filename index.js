var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);


var socket_list = {};

io.on('connection', function(socket){

    socket_list[socket.id] = socket.handshake.address.split(":")[3] || socket.request.connection.remoteAddress.split(":")[3];
    socket.on('disconnect', function(){
        delete socket_list[socket.id]; 
    });

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

    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(socket_list));
    
});