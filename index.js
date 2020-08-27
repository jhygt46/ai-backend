var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var CircularJSON = require('circular-json');

io.on('connection', function(socket){

    console.log('a user connected: ' + socket.id);
    socket.on('disconnect', function(){
        console.log( socket.name + ' has disconnected from the chat.' + socket.id);
    });
    socket.on('join', function (name) {
        socket.name = name;
        console.log(socket.name + ' joined the chat.');
    });

    //var ip = socket.handshake.address.split(":")[3] || socket.request.connection.remoteAddress.split(":")[3];
    //console.log(ip);

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

    fs.readFile("socket.json","utf8" ,function(err, contents){
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.write(contents);
        res.end();
    });
    
});