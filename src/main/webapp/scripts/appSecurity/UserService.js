'use strict';

WirgeManageApp.factory('UserService', ['$resource',
  function ($resource) {

    return $resource('/rest/gaeUser', {}, {

      'getGaeUser': { method: 'GET', withCredentials: true}

    });
  }]);


