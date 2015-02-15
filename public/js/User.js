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
          factory.data = data
          window.sessionStorage['username'] = data.username
          if(callback){
            callback(data)
          }
        })
    }

    factory.logout = function() {
      window.sessionStorage.removeItem('username')
      factory.data = {logged: false}
      $http.post('/logout',{})
    }



    return factory
  }
])
app.controller('UserCtrl', ['$scope', 'User',
  function($scope, User) {
    $scope.user = User
    $scope.logout = function(){
      User.logout()
    }
    $scope.login = function(loginData){
      var data = angular.copy(loginData)
      loginData.password = ''
      var success = function(){
        console.log('login successfull')
      }
      User.login(data, success)
    }
  }
])
