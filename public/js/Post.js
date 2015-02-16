app.controller('PostCtrl', ['$scope', '$http', '$routeParams', 'User',
  function($scope, $http, $routeParams, User) {
    var $scope = $scope;
    $scope.userData = User.data
    $scope.expandComment = false
    $scope.currentPost = {}
    $scope.comments = {}
    $scope.editMode = false
    $scope.editAllowed = false

    $scope.$watch(
      function() {
        return User.data.username
      },
      function(newVal, oldVal) {
        $scope.editAllowed = (newVal === $scope.currentPost.author)
      }
    )

    $scope.startEdit = function() {
      $scope.currentPost.newContent = $scope.currentPost.content
      $scope.editMode = true
    }

    $scope.cancelEdit = function() {
      $scope.editMode = false
    }

    $scope.saveEdit = function() {
      $http.put('/post/' + $routeParams.postId, {
        content: $scope.currentPost.newContent
      })
      $scope.currentPost.content = $scope.currentPost.newContent
      $scope.editMode = false
    }


    $scope.getPost = function(id) {
      $http.get('/post/' + id)
        .success(function(data) {
          $scope.currentPost = data
          $scope.editAllowed = data.author === User.data.username
          console.log(data)
        })
    }

    $scope.getComments = function(id) {
      $http.get('/comments/' + id)
        .success(function(data) {
          $scope.comments = data
          console.log(data)
        })
    }

    $scope.getPost($routeParams.postId)
    $scope.getComments($routeParams.postId)

    $scope.newComment = ''
    $scope.submitComment = function() {
      var data = {
        postId: $scope.currentPost.id,
        text: $scope.newComment
      }
      $http.post('/comment/' + $scope.currentPost.id, data)
        .success(function(data) {
          console.log(data)
        })

      $scope.newComment = ''
      $scope.expandComment = false
    }

    $scope.votePost = function(value) {
      $http.post('/votepost/' + $scope.currentPost.id + '/' + value)
    }

    $scope.voteComment = function(commentId, value) {
      $http.post('/votecomment/' + $scope.currentPost.id + '/' + commentId + '/' + value)
    }


  }
])
