app.factory('postListFactory', ['$http', 'socket', '$routeParams', 
  function($http, socket, $routeParams) {
    var factory = {}
    factory.filter = {
      room: $routeParams.roomId
    }
    factory.data = {
      navbar: false
    }

    socket.on('updateList', function() {
      factory.getPosts(factory.filter)
    })

    factory.posts = {
      data: []
    }

    factory.getPosts = function(filter) {
      $http.post('/posts', filter)
        .success(function(data) {
          console.log(filter)
          factory.posts.data = data
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
    this.data = postListFactory.data
  }
])
