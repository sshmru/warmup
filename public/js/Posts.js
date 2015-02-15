app.factory('Posts', ['$http', '$routeParams', 
  function($http, $routeParams) {
    var factory = {}
    factory.filter = {
      room: $routeParams.roomId
    }

    factory.data = []

    factory.getPosts = function(filter, callback) {
      console.log(filter)
      $http.get('/posts/' + filter.room, filter)
        .success(function(data) {
          factory.data = data
          console.log(data)
          if(callback){
            callback(data)
          }
        })
    }

    factory.getPosts(factory.filter)


    return factory
  }
])
