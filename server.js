var path = require('path')
var express = require('express')
var less = require('less-middleware')

var app = express()

app.use(less(path.join(__dirname, '/public')))
app.use(express.static(path.join(__dirname, 'public')))

var db = require('./db')
var routes = require('./routes/index')(app, db)
app.use('/', routes)

console.log('app started - port 3000')
var server = app.listen(3000)
