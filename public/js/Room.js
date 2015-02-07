app.controller('RoomCtrl', ['$scope', 'Posts',
  function($scope, Posts) {
    $scope.posts = Posts
  }
])
