'use strict';

WirgeManageApp.factory('AdminService', ['$resource', 'WirgeManageAppService',
  function ($resource, wirgeManageAppService) {

    return $resource(wirgeManageAppService.restUrl + '/appAdmin', {}, {

      'getAppAdmin': { method: 'GET', withCredentials: true}

    });
  }]);


