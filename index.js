var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

io.on('connection', function(){ console.log("SERVER START"); });

http.listen(config.port, () => {
    console.log("El servidor está inicializado en el puerto "+config.port);
});

http.get('/', function(req, res){

    var correo = "buena@nelson.com";
    io.emit('nuevo_correo', correo);

    res.setHeader('Content-Type', 'text/plain');
    res.end("Listo");
    
});

/*

const fs = require("fs");

var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: true });
var cors = require('cors');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var config = JSON.parse(fs.readFileSync('./config.json'));




app.get('/', urlencodedParser, function(req, res){

    var correo = "buena@nelson.com";
    io.emit('nuevo_correo', correo);

    res.setHeader('Content-Type', 'text/plain');
    res.end("Listo");
    
});

*/