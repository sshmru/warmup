app.controller('roomController', ['$scope', '$routeParams', 'postListFactory' ,function($scope, $routeParams, postListFactory){
  this.params = $routeParams
//  postListFactory.filter.room = this.params.roomId

  postListFactory.getPosts({room: this.params.roomId})
  postListFactory.data.navbar = false
}])
