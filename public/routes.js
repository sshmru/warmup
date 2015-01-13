app.config(function($routeProvider, $locationProvider) {
  $routeProvider
   .when('/r/:roomId', {
    templateUrl: 'templates/roomView.html',
    controller: 'roomController',
    controllerAs: 'roomCtrl',
  })
   .when('/r/:roomId/:postId', {
    templateUrl: 'templates/postView.html',
    controller: 'postController',
    controllerAs: 'postCtrl',
  })
  .otherwise({
    redirectTo: '/r/general'
  });

  $locationProvider.html5Mode(true);
});
