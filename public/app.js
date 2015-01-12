var app = angular.module('myApp', [])

app.factory('postListFactory', ['$http', function($http){
  var factory = {}
  factory.posts = {data:[]}
  $http.get('/posts').
    success(function(data){
      factory.posts.data =  data
      console.log(factory.posts)
  })
  return factory
}])

app.controller('postListController', ['$scope', 'postListFactory', function($scope, postListFactory){
  this.list = postListFactory.posts


//  $scope.$watch(postListFactory.posts)
}])
