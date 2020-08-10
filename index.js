var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

io.on('connection', function(){ console.log("SERVER START"); });

const fs = require("fs");
var config = JSON.parse(fs.readFileSync('./config.json'));

http.listen(config.port, () => {
    console.log("El servidor está inicializado en el puerto "+config.port);
});

app.get('/', function(req, res){

    var correo = "buena@nelson.com";
    io.emit('nuevo_correo', correo);

    res.setHeader('Content-Type', 'text/plain');
    res.end("Listo");
    
});

/*

var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: true });
var cors = require('cors');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));






app.get('/', urlencodedParser, function(req, res){

    var correo = "buena@nelson.com";
    io.emit('nuevo_correo', correo);

    res.setHeader('Content-Type', 'text/plain');
    res.end("Listo");
    
});

*/