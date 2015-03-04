'use strict';

WirgeManageApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider
      .when('/userMessage/:id', {
        templateUrl: 'views/userMessage.html',
        controller: 'UserMessageController',
        resolve: {
          resolvedMessage: ['UserMessageService', '$route', function (UserMessageService, $route) {
            return UserMessageService.getMessage({id : $route.current.params.id});
          }]
        }
      })
      .when('/userMessages', {
        templateUrl: 'views/userMessages.html',
        controller: 'UserMessagesController',
        resolve: {
          resolvedMessages: ['UserMessageService', function (UserMessageService) {
            return UserMessageService.getMessages();
          }]
        }
      });
  }]);

