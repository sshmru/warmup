var path = require('path')
var express = require('express')
var session = require('express-session')
var less = require('less-middleware')
var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')
var app = express()

var socket = require('./socket.js');
var db = require('./db')
var passport = require('./passport.js')(db);


app.use(bodyParser.json());

app.use(less(path.join(__dirname, '/public')))
app.use(express.static(path.join(__dirname, 'public')))

app.use(cookieParser());
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}))

app.use(passport.initialize());
app.use(passport.session());

var routes = require('./routes/index')(app, db, socket, __dirname, passport)
app.use('/', routes)

var server = app.listen(3000)
console.log('app started - port 3000')

socket.socketServer(server);
