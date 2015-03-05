'use strict';

WirgeApp.factory('UserMessageService', ['$resource', 'WirgeUrlsService',
  function ($resource, urlsService) {
    return $resource(urlsService.restUrl + '/userMessages', {}, {
      // Create Message:
      'createMessage': { method: 'POST', withCredentials: true}
    });
  }]);


