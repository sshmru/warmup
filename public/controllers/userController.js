app.factory('userFactory', ['$http',
  function($http) {
    var factory = {}
    factory.user = {
      data: {
        logged: false
      }
    }

    if(window.localStorage['username']){
      factory.user.data.logged = true,
      factory.user.data.username = window.localStorage['username']
    }

    factory.login = function(data) {
      $http.post('/login', data)
        .success(function(data) {
          factory.user.data = data
          window.localStorage['username'] = data.username
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
