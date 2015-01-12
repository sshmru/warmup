var app = angular.module('myApp', [])
app.factory('socket', function () {
    var socket = io.connect('http://' + location.host);
    return socket;
})
app.factory('postListFactory', ['$http', 'socket',
  function($http, socket) {
    var factory = {}

    socket.on('newPost', function(){
      factory.getPosts()
    })

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
