app.controller('postController', ['$scope', '$routeParams', '$http',
  function($scope, $routeParams, $http) {
    this.params = $routeParams
    this.currentPost = {data:{}}
    this.getPost = function(filter){
      var self = this;
    $http.post('/posts', filter)
      .success(function(data) {
        self.currentPost.data = data[0]
        console.log(filter)
        console.log(data)
      })
    }
    this.getPost({
        room: this.params.roomId,
        id: Number(this.params.postId)
      }
    )
  }
])
