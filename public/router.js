app.config(function($routeProvider, $locationProvider) {
  $routeProvider
   .when('/r/:roomId', {
    templateUrl: 'views/roomView.html',
    controller: 'RoomCtrl',
  })
   .when('/r/:roomId/:postId', {
    templateUrl: 'views/postView.html',
    controller: 'PostCtrl',
  })
   .when('/u/:profileId', {
    templateUrl: 'views/profileView.html',
    controller: 'ProfileCtrl',
  })
  .otherwise({
    redirectTo: '/r/general'
  });

  $locationProvider.html5Mode(true);
});
