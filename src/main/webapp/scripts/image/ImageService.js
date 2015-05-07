'use strict';

WirgeManageApp.factory('ImageService', ['$resource', 'WirgeManageAppService',
  function ($resource, wirgeManageAppService) {
    return $resource(wirgeManageAppService.restUrl + '/images', {}, {

      // uploadUrl:
      'getUploadUrl': { method: 'GET', url: wirgeManageAppService.restUrl + '/images/uploadUrl', withCredentials: true},

      // all images:
      'getImages': { method: 'GET', withCredentials: true, isArray:true},

      // get single Image:
      'getImage': { method: 'GET', url: wirgeManageAppService.restUrl + '/images/:key', withCredentials: true},

      // Create Image:
      'createImage': { method: 'POST', withCredentials: true},

      // Save Image:
      'saveImage': { method: 'PUT', withCredentials: true},

      // Delete Image:
      'deleteImage': { method: 'DELETE', url: wirgeManageAppService.restUrl + '/images/:key', withCredentials: true}
    });
  }]);


