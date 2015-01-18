app.factory('userFactory', ['$http',
  function($http) {
    var factory = {}
    factory.user = {
      data: {
        logged: false
      }
    }

    if (window.sessionStorage['username']) {
      factory.user.data.logged = true,
        factory.user.data.username = window.sessionStorage['username']
    }

    factory.login = function(data) {
      $http.post('/login', data)
        .success(function(data) {
          factory.user.data = data
          window.sessionStorage['username'] = data.username
          console.log(factory.user.data)
        })
    }

    factory.logout = function() {
      window.sessionStorage.removeItem('username')
      factory.user.data = {logged: false}
      $http.get('/logout',{})
    }



    return factory
  }
])
app.controller('userController', ['$scope', 'userFactory',
  function($scope, userFactory) {
    this.user = userFactory.user
    this.loginData = {}
    this.logout = userFactory.logout
    this.login = function(loginData) {
      userFactory.login(loginData)
      this.loginData = {}
    }
  }
])
