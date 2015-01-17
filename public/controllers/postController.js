app.controller('postController', ['$scope', '$routeParams', '$http', 'userFactory', 'socket', 'postListFactory', '$sce',
  function($scope, $routeParams, $http, userFactory, socket, postListFactory, $sce) {
    postListFactory.data.navbar = true
    this.expandComment = false
    postListFactory.getPosts({room: $routeParams.roomId})
    this.params = $routeParams
    this.currentPost = {}
    var self = this;

    socket.on('updatePost', function(postId) {
        console.log('updating comments')
      if(Number(postId)===Number(self.params.postId)){
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
        text: self.newComment
      }
      $http.post('/newcomment', data)
        .success(function(data) {
          console.log(data)
        })

      this.newComment = ''
      this.expandComment = false
    }

    this.upvotePost = function(value) {
      var data = {
        id: self.currentPost.id,
        value: value,
      }
      $http.post('/upvotepost', data)
    }

    this.upvoteComment = function(commentId, value) {
      var data = {
        commentId: commentId,
        id: self.currentPost.id,
        value: value,
      }
      $http.post('/upvotecomment', data)
    }
  }
])
