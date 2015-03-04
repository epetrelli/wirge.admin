'use strict';

WirgeManageApp.controller('UserMessagesController', ['$scope', '$location', 'UserMessageService', 'resolvedMessages',

  function ($scope, $location, userMessageService, resolvedMessages) {

    $scope.userMessages = resolvedMessages;

    resolvedMessages.$promise.then(function (resolvedMessages) {
      console.log($scope.userMessages.length + " messages");
    });

    $scope.viewMessage = function(id){
      console.log("goToUserMessage(" + id + ")")
      $location.path('/userMessage/' + id);
    }




  }]);
