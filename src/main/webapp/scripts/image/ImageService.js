'use strict';

WirgeManageApp.factory('ImageService', ['$resource', 'WirgeManageAppService',
  function ($resource, wirgeManageAppService) {
    return $resource(wirgeManageAppService.restUrl + '/images', {}, {

      // all images:
      'getImages': { method: 'GET', withCredentials: true, isArray:true},

      // get single Image:
      'getImage': { method: 'GET', url: wirgeManageAppService.restUrl + '/images/:idStoredImage', withCredentials: true},

      // Create Image:
      'createImage': { method: 'POST', withCredentials: true},

      // Save Image:
      'saveImage': { method: 'PUT', withCredentials: true},

      // Delete Image:
      'deleteImage': { method: 'DELETE', url: wirgeManageAppService.restUrl + '/images/:idStoredImage', withCredentials: true}
    });
  }]);


