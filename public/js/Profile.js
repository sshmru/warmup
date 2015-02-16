app.controller('ProfileCtrl', ['$scope', '$routeParams', '$http', 'User',
  function($scope, $routeParams, $http, User) {
    $scope.profile = {}
    $scope.show = 'info';
    $scope.editMode = false
    $scope.editAllowed = false

    $scope.$watch(
      function() {
        return User.data.username
      },
      function(newVal, oldVal) {
        console.log(newVal)
        $scope.editAllowed = (newVal === $scope.profile.username)
      }
    )

    $scope.startEdit = function() {
      $scope.profile.newInfo = $scope.profile.info
      $scope.editMode = true
    }

    $scope.cancelEdit = function() {
      $scope.editMode = false
    }

    $scope.saveEdit = function() {
      $http.put('/profile/' + $routeParams.profileId, {
        info: $scope.profile.newInfo
      })
      $scope.profile.info = $scope.profile.newInfo
      $scope.editMode = false
    }

    $scope.getProfile = function(id) {
      console.log(id)
      $http.get('/profile/' + id)
        .success(function(data) {
          $scope.profile = data
          console.log(data)
          $scope.editAllowed = User.data.username === data.username
        })
    }

    $scope.getProfile($routeParams.profileId)

  }
])
