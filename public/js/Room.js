app.controller('RoomCtrl', ['$scope', 'Posts', '$routeParams',
  function($scope, Posts, $routeParams) {
    $scope.$on('$routeChangeSuccess', function(x, current) {
      Posts.getPosts({
        room: $routeParams.roomId
      })
    })

    $scope.posts = Posts
  }
])
