 app.directive('toggleBox', function() {
    return {
      restrict: 'E',
      transclude: true,
      scope: {
        visible: '='
      },
      controller: function($scope) {
      },
      link: function(scope, element, attrs) {
        scope.toggle= function(){
            scope.visible = !scope.visible
        }
      },
      template: '<div >' +
        '<button ng-click="toggle()">{{visible ? "hide" : "show"}}</button>' +
        '<div ng-show="visible" ng-transclude></div>' +
        '</div>'
    };
  });
