var app = angular.module('myApp', ['ngRoute'])
app.factory('socket', function() {
  var socket = io.connect('http://' + location.host);
  socket.on('connect', function(){
    console.log('socket connected')
  })
  return socket;
})

app.run(['$rootScope', 'socket',function($rootScope,socket){
  //change this one to give information on user current route
  $rootScope.$on('$routeChangeSuccess', function(){
    socket.emit('subscribeTo', {
      room: 'general'
    })
  })
}])
