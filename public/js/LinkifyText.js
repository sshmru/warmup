app.directive('linkify', function($compile, $sce) {
  return {
    restrict: 'A',
    link: function(scope, elem, attrs) {
      scope.$watch(attrs['linkify'], function(text) {
        if (/([<>])+/g.test(text)) { //escape html tags
          text = text.replace('<', '&lt')
          text = text.replace('>', '&gt')
          elem.html(text)
        } else if (text) { //if contains url, replace by link
          var urlRegExp = /(http|ftp|https):\/\/([\w\-_]+(?:(?:\.[\w\-_]+)+))([\w\-\.,@?^=%&amp;:/~\+#]*[\w\-\@?^=%&amp;/~\+#])?/g
          var html = text.replace(urlRegExp, function(url) {
            var extension = url.match(/\.[a-z]+$/g)[0]
              //if image, give preview
              //WARNIG, USES FULL SIZE IMAGES, GOING FOR THUMBAILS WOULD BE RECOMMENDED
            var content = (['.jpg', '.png'].indexOf(extension) == -1) ? url : '<img src="' + url + '" height="100px" max-width="100px"/>'
            return '<a href="' + url + '">' + content + '</a>'
          })
          console.log(html)
          html = html.replace(/\n/g, '<br/>') //adds forces newline characters
          html = $sce.trustAsHtml(html)
          elem.html(html)
          $compile(elem.contents())(scope);
        }
      })
    }
  }
})
