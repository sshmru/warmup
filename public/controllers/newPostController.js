app.controller('newPostController', ['$scope', '$http', 'userFactory', '$routeParams',
  function($scope, $http, userFactory, $routeParams) {
    this.expanded = false
    this.hovered = false
    this.isEmpty = function(){
      return(
      this.post.content.trim().length===0 &&
      this.post.title.trim().length===0 &&
      this.post.tags.trim().length===0
      )
    }
    var self = this

    this.expand = function(){
      this.expanded = true
    }

    this.hideUnfocusedEmpty = function(){
      if(this.isEmpty() && !this.hovered){
        this.expanded = false
      }
    }


    var emptyPost = function() {
      return {
        title: '',
        tags: '',
        content: ''
      }
    }

    this.post = emptyPost()
    this.submitPost = function() {
      var obj = this.post
      obj.room = $routeParams.roomId
      $http.post('/newpost', obj)
        .success(function(){
          //add jumping to new page here
          self.expanded = false
        })
      this.post = emptyPost()
    }
  }
])
