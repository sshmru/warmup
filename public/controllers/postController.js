app.controller('postController', ['$scope', '$routeParams', '$http', 'userFactory', 'socket', 'postListFactory', '$sce',
  function($scope, $routeParams, $http, userFactory, socket, postListFactory, $sce) {
    var self = this;
    postListFactory.data.navbar = true
    this.userData = userFactory.user.data
    this.expandComment = false
    postListFactory.getPosts({room: $routeParams.roomId})
    this.params = $routeParams
    this.currentPost = {}
    this.editMode = false

    this.startEdit = function(){
      this.currentPost.newContent = this.currentPost.content
      this.editMode = true
    }
    this.cancelEdit = function(){
        this.editMode = false
    }
    this.saveEdit = function(){
      $http.post('/editpost', {
        id: Number(self.params.postId),
        content : self.currentPost.newContent
      })
      this.currentPost.content = this.currentPost.newContent
      this.editMode = false
    }


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
        postId: self.currentPost.id,
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
