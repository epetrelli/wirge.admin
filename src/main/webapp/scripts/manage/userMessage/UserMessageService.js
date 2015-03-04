'use strict';

WirgeManageApp.factory('UserMessageService', ['$resource', 'WirgeManageAppService',
  function ($resource, wirgeManageAppService) {
    return $resource(wirgeManageAppService.restUrl + '/userMessages', {}, {

      // all messages:
      'getMessages': { method: 'GET', withCredentials: true, isArray:true},

      // get single message:
      'getMessage': { method: 'GET', url: wirgeManageAppService.restUrl + '/userMessages/:id', withCredentials: true},

      // Create Message:
      'createMessage': { method: 'POST', withCredentials: true},

      // Save Message:
      'saveMessage': { method: 'PUT', withCredentials: true},

      // Delete Message:
      'deleteMessage': { method: 'DELETE', url: wirgeManageAppService.restUrl + '/userMessages/:id', withCredentials: true}
    });
  }]);


