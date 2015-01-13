app.config(function($routeProvider, $locationProvider) {
  $routeProvider
   .when('/r/:roomName', {
    templateUrl: 'templates/roomView.html',
    controller: 'roomController',
  })
   .when('/r/:roomName/:postId', {
    templateUrl: 'templates/postView.html',
    controller: 'postController',
  })
  .otherwise({
    redirectTo: '/'
  });

  $locationProvider.html5Mode(true);
});
