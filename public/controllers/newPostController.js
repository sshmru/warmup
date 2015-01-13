app.factory('newPostFactory', ['$http', 'userFactory', '$routeParams',
  function($http, userFactory, $routeParams) {
    var factory = {}
    factory.newPost = function(obj) {
      obj.author = userFactory.user.data.username
      obj.room = $routeParams.roomId
      $http.post('/newpost', obj)
    }
    return factory
  }
])
app.controller('newPostController', ['$scope', 'newPostFactory',
  function($scope, newPostFactory) {
    var emptyPost = function() {
      return {
        title: '',
        tags: '',
        content: ''
      }
    }
    this.post = emptyPost()
    this.submitPost = function() {
      console.log('sending')
      newPostFactory.newPost(this.post)
      this.post = emptyPost()
    }
  }
])
