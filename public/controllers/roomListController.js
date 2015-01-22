app.controller('roomListController', ['$http', function($http){
  this.rooms = []
  var self = this
  this.getRoomList = function(){
    $http.post('/rooms')
      .success(function(data){
        self.rooms = data;
      })
  }
  this.getRoomList()
}])
