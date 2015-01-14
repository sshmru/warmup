var app = angular.module('myApp', ['ngRoute'])
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
app.filter('trustHtml', ['$sce',
  function($sce) {
    return function(text) {
      return $sce.trustAsHtml(text)
    }
  }
])
app.filter('makeLinks', [

  function() {
    return function(text) {
      var urlRegExp = /(http|ftp|https):\/\/([\w\-_]+(?:(?:\.[\w\-_]+)+))([\w\-\.,@?^=%&amp;:/~\+#]*[\w\-\@?^=%&amp;/~\+#])?/g
      return text.replace(urlRegExp, function(match) {
        return '<a href="' + match + '">' + match + '</a>'
      })
    }
  }
])
