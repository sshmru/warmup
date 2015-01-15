app.factory('userFactory', ['$http',
  function($http) {
    var factory = {}
    factory.user = {
      data: {
        logged: false
      }
    }

    factory.login = function(data) {
      $http.post('/login', data)
        .success(function(data) {
          factory.user.data = data
          console.log(factory.user.data)
        })
    }

    return factory
  }
])
app.controller('userController', ['$scope', 'userFactory' ,function($scope, userFactory){
  this.user = userFactory.user
  this.loginData = {}
  this.login = function(loginData){
    userFactory.login(loginData)
    this.loginData = {}
  }
}])
