
  /*  

app.directive('safeLinksText', function() {
    return {
      restrict: 'A',
      scope: {
        txt: '='
      },
      controller: function(scope, $sce){
        scope.newText = $sce.trustAsHtml('<p> lollololol </p>')
      },
      template: '<p>{{newText}}</p>'
    }
  })
      return function(text) {
        alert(text)
        if(!text){
          return ''
        }
        if (/([<>])+/g.test(text)) {
          return 'unsafe content'
        }
        var urlRegExp = /(http|ftp|https):\/\/([\w\-_]+(?:(?:\.[\w\-_]+)+))([\w\-\.,@?^=%&amp;:/~\+#]*[\w\-\@?^=%&amp;/~\+#])?/g
        var linkifiedText = text.replace(urlRegExp, function(match) {
          return '<a href="' + match + '">' + match + '</a>'
        })
        return $sce.trustAsHtml(linkifiedText)
      }
      */
