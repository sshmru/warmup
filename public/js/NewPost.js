app.controller('newPostCtrl', ['$scope', '$http', 'User', '$routeParams', '$location',
  function($scope, $http, User, $routeParams, $location) {
    $scope.expanded = false
    $scope.hovered = false
    $scope.isEmpty = function() {
      //ensure all fields have nothing but whitespace
      return (
        $scope.post.content.trim().length === 0 &&
        $scope.post.title.trim().length === 0 &&
        $scope.post.tags.trim().length === 0
      )
    }
    var $scope = $scope

    $scope.expand = function() {
      $scope.expanded = true
    }

    $scope.hideUnfocusedEmpty = function() {
      if ($scope.isEmpty() && !$scope.hovered) {
        $scope.expanded = false
      }
    }

    var emptyPost = function() {
      return {
        title: '',
        tags: '',
        content: ''
      }
    }

    $scope.post = emptyPost()
    $scope.submitPost = function() {
      var obj = $scope.post
      obj.room = $routeParams.roomId
      $http.post('/post', obj)
        .success(function(url) {
          console.log('new posts url: ', url)
          $location.url(url)
            //add jumping to new page here
          $scope.expanded = false
        })
      $scope.post = emptyPost()
    }
  }
])
