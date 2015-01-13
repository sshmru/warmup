app.controller('postController', ['$scope', '$routeParams', '$http', 'userFactory', 'socket',
  function($scope, $routeParams, $http, userFactory, socket) {
    this.params = $routeParams
    this.currentPost = {}
    var self = this;

    socket.on('updatePost', function(postId) {
      if(Number(postId)===Number(self.params.postId)){
        console.log('updating comments')
        self.getPost({
          id: Number(self.params.postId)
        })
      }
    })

    socket.on('newComment', function(postId) {
      if(Number(postId)===Number(self.params.postId)){
        console.log('updating comments')
        self.getPost({
          id: Number(self.params.postId)
        })
      }
    })

    this.getPost = function(filter) {
      $http.post('/getpost', filter)
        .success(function(data) {
          self.currentPost = data
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

    this.upvotePost = function() {
      var data = {
        id: self.currentPost.id,
        author: userFactory.user.data.username,
      }
      $http.post('/upvotepost', data)
    }

    this.upvoteComment = function(commentId) {
      var data = {
        commentId: commentId,
        id: self.currentPost.id,
        author: userFactory.user.data.username,
      }
      $http.post('/upvotecomment', data)
    }
  }
])
