var app = angular.module('myApp', ['ngRoute'])
app.factory('socket', function() {
  var socket = io.connect('http://' + location.host);
  socket.on('connect', function(){
    console.log('socket connected')
  })
  return socket;
})

