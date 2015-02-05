app.factory('User', ['$http',
  function($http) {
    var factory = {}
    factory.data = {
        logged: false
    }

    if (window.sessionStorage['username']) {
      factory.data.logged = true,
      factory.data.username = window.sessionStorage['username']
    }

    factory.login = function(data, callback) {
      $http.post('/login', data)
        .success(function(data) {
          for(var prop in data){
            factory.data[prop] = data[prop]
          }
          window.sessionStorage['username'] = data.username
          console.log(factory.data)
          callback()
        })
    }

    factory.logout = function() {
      window.sessionStorage.removeItem('username')
      factory.data.logged = false
      factory.data.username = ''
      $http.post('/logout',{})
    }



    return factory
  }
])
app.controller('UserCtrl', ['$scope', 'User',
  function($scope, User) {
    $scope.user = User
    $scope.userData = User.data
    $scope.logout = function(){
      User.logout()
    }
    $scope.login = function(loginData){
      var success = function(){
        loginData = {}
      }
      User.login(loginData, success)
    }
  }
])