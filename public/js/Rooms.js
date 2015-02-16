app.controller('RoomsCtrl', ['$scope', '$http', 
  function($scope, $http) {
    $scope.rooms = []
    $scope.roomChunks = []
    
    $http.get('/rooms')
      .success(function(data){
        $scope.rooms=data
        var temp = angular.copy(data)
        while(temp.length>0){
          $scope.roomChunks.push(temp.splice(0,3))
        }
      })
  }
])
