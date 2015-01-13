var app = angular.module('myApp', ['ngRoute' ])
app.factory('socket', function() {
  var socket = io.connect('http://' + location.host);
  return socket;
})
app.directive('sign', function() {
    return {
      restrict: 'E',
      scope: {
        val: '='
      },
      template: '<span >' +
        '{{val >= 0 ? "+" : ""}}' + 
        '</span>'
    };
  });


