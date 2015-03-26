'use strict';

WirgeManageApp.controller('AppSecurityController', ['$scope', 'UserService', 'AdminService',

  function ($scope, userService, adminService) {

    $scope.gaeUser = {};
    $scope.appAdmin = {};

    userService.getGaeUser().$promise.then(
      function (gaeUser) {
        console.log("gaeUser found: " + gaeUser.email);
        $scope.gaeUser = gaeUser;

        adminService.getAppAdmin(gaeUser).$promise.then(
          function (appAdmin) {
            console.log("appAdmin found");
            $scope.appAdmin = appAdmin;
          },
          function (reason) {
            console.log("error getting appAdmin (reason: " + reason + ")");
          });

      },
      function (reason) {
        console.log("error getting gaeUser (reason: " + reason + ")");
      });

  }]);
