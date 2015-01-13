app.factory('postListFactory', ['$http', 'socket',
  function($http, socket) {
    var factory = {}
    factory.filter = {}

    socket.on('newPost', function() {
      factory.getPosts(factory.filter)
    })


    factory.posts = {
      data: []
    }

    factory.getPosts = function(filter) {
      $http.post('/posts', filter)
        .success(function(data) {
          factory.posts.data = data
          console.log(filter)
          console.log(data)
        })
    }

    factory.getPosts(factory.filter)


    return factory
  }
])

app.controller('postListController', ['$scope', 'postListFactory',
  function($scope, postListFactory) {
    this.list = postListFactory.posts
  }
])
