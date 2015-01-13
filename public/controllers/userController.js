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
          alert(data.logged)
        })
    }

    return factory
  }
])
app.controller('userController', ['$scope', 'userFactory' ,function($scope, userFactory){
  this.user = userFactory.user
  this.loginData = {}
  this.login = function(loginData){
    console.log(this.loginData)
    userFactory.login(loginData)
    this.loginData = {}
  }
}])
