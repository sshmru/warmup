app.controller('postController', ['$scope', '$routeParams', '$http', 'userFactory',
  function($scope, $routeParams, $http, userFactory) {
    this.params = $routeParams
    this.currentPost = {}
    var self = this;
    this.getPost = function(filter) {
      $http.post('/getpost', filter)
        .success(function(data) {
          self.currentPost = data
          console.log(filter)
          console.log(data)
        })
    }
    this.getPost({
      id: Number(this.params.postId)
    })
    this.newComment = ''
    this.submitComment = function() {
      var data = {
        id: self.currentPost.id,
        author: userFactory.user.data.username,
        text: self.newComment
      }
      $http.post('/newcomment', data)
        .success(function(data) {
          console.log(data)
        })

      this.newComment = ''
    }

  }
])
