app.directive('linkify', function($compile, $sce) {
  return {
    restrict: 'A',
    link: function(scope, elem, attrs) {
      scope.$watch(attrs['linkify'], function(text) {
        if (/([<>])+/g.test(text)) {
          text = text.replace('<', '&lt')
          text = text.replace('>', '&gt')
          elem.html(text)
        }else if(text){
          var urlRegExp = /(http|ftp|https):\/\/([\w\-_]+(?:(?:\.[\w\-_]+)+))([\w\-\.,@?^=%&amp;:/~\+#]*[\w\-\@?^=%&amp;/~\+#])?/g
          var html = text.replace(urlRegExp, function(match) {
            return '<a href="' + match + '">' + match + '</a>'
          })
          html = $sce.trustAsHtml(html)
          elem.html(html)
          $compile(elem.contents())(scope);
        }
      })
    }
  }
})
