var app = angular.module('myApp', [])

app.factory('postListFactory', ['$http',
  function($http) {
    var factory = {}
    factory.posts = {
      data: []
    }
    factory.getPosts = function() {
      $http.get('/posts').
      success(function(data) {
        factory.posts.data = data
      })
    }
    factory.getPosts()

    factory.newPost = function(obj) {
      $http.post('/newpost', obj)
      factory.getPosts()
    }

    return factory
  }
])

app.controller('postListController', ['$scope', 'postListFactory',
  function($scope, postListFactory) {
    this.list = postListFactory.posts
  }
])


app.controller('newPostController', ['$scope', 'postListFactory',
  function($scope, postListFactory) {
    var emptyPost = function() {
      return {
        author: '',
        title: '',
        tags: '',
        content: ''
      }
    }
    this.post = emptyPost()
    this.submitPost = function() {
      console.log('sending')
      postListFactory.newPost(this.post)
      this.post = emptyPost()
    }
  }
])
