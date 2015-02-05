var path = require('path')
var express = require('express')
var session = require('express-session')
var less = require('less-middleware')
var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')
var app = express()

var socket = require('./lib/socket.js');
var db = require('./lib/db')
var userdb = require('./lib/db')
var passport = require('./lib/passport.js')(userdb);


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

var routes = require('./routes/routes')(app, socket, __dirname, passport, db)
app.use('/', routes)

var server = app.listen(3000)
console.log('app started - port 3000')

socket.socketServer(server);
