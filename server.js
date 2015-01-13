var path = require('path')
var express = require('express')
var less = require('less-middleware')
var bodyParser = require('body-parser')
var app = express()

var socket = require('./socket.js');


app.use(bodyParser.json());

app.use(less(path.join(__dirname, '/public')))
app.use(express.static(path.join(__dirname, 'public')))

var db = require('./db')
var routes = require('./routes/index')(app, db, socket, __dirname)
app.use('/', routes)

var server = app.listen(3000)
console.log('app started - port 3000')

socket.socketServer(server);
