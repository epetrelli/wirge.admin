'use strict';

WirgeManageApp.controller('UserMessageController', ['$scope', '$location', 'UserMessageService', 'resolvedMessage',

  function ($scope, $location, userMessageService, resolvedMessage) {

    $scope.userMessage = resolvedMessage;

    resolvedMessage.$promise.then(function (resolvedMessage) {

      console.log("Message loaded: id=" + resolvedMessage.id);

      $scope.deleteMessage = function(userMessage){

        var userMessageTodelete = {};
        userMessageTodelete.id = userMessage.id;

        userMessageService.deleteMessage({id:userMessage.id}).$promise.then(
            function () {
              console.log("Message deleted");
              $location.path("/userMessages");
            }, function (reason) {
              console.log("error deleting message (reason: " + reason + ")");
            });
      }

      $scope.backToMessages = function() {
        $location.path("/userMessages");
      }

    });

  }]);
