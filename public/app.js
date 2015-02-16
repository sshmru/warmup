var app = angular.module('myApp', ['ngRoute'])
app.factory('socket', function() {
  var socket = io.connect('http://' + location.host);
  socket.on('connect', function(){
    console.log('socket connected')
  })
  return socket;
})

app.run(['$rootScope', 'socket', '$location',function($rootScope,socket, $location){
  //change this one to give information on user current route
  $rootScope.$on('$routeChangeSuccess', function(x, current){
    console.log('route change success', $location.url())
    socket.emit('subscribeTo', {
      room: $location.url()
    })
  })
}])

app.filter('score', function(){
  return function(data){
    if(data === 0) {
      return '+ -'
    } else if(data > 0) {
      return '+ ' + data
    } else {
      return '- ' + Math.abs(data)
    }
  }
})
