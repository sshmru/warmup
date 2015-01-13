
app.controller('roomController', ['$scope', '$routeParams', 'postListFactory' ,function($scope, $routeParams, postListFactory){
  this.params = $routeParams
  postListFactory.getPosts({room: this.params.roomId})
}])
