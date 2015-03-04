'use strict';

WirgeManageApp
  .config(['$routeProvider', '$httpProvider',
    function ($routeProvider) {
      $routeProvider
        .otherwise({
          templateUrl: 'views/home.html',
          redirectTo: '/'
        });
      //Other routes are defined control by control
    }]);
