app.controller('profileController', ['$scope', '$routeParams', 'postListFactory', '$http', function($scope, $routeParams, postListFactory, $http){
  this.params = $routeParams
  this.user = {}
  var self = this;
  this.show  = 'info';

    this.getProfile = function(filter) {
      $http.post('/getprofile', filter)
        .success(function(data) {
          self.user = data
        })
    }
    this.getProfile({id: this.params.profileId})

  postListFactory.data.navbar = true
}])
