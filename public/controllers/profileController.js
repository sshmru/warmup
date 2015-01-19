app.controller('profileController', ['$scope', '$routeParams', 'postListFactory', '$http', 'userFactory',
  function($scope, $routeParams, postListFactory, $http, userFactory) {
    this.params = $routeParams
    this.user = {}
    var self = this;
    this.show = 'info';
    this.editMode = false
    this.userData = userFactory.user.data

    this.startEdit = function(){
      this.user.newInfo = this.user.info
      this.editMode = true
    }

    this.cancelEdit = function(){
        this.editMode = false
    }

    this.saveEdit = function(){
      $http.post('/editProfile', {
        info : self.user.newInfo
      })
      this.user.info = this.user.newInfo
      this.editMode = false
    }

    this.getProfile = function(filter) {
      $http.post('/getprofile', filter)
        .success(function(data) {
          self.user = data
        })
    }
    this.getProfile({
      id: this.params.profileId
    })

    postListFactory.data.navbar = true
  }
])
