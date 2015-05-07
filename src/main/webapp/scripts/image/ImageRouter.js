'use strict';

WirgeManageApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider
      .when('/image/:key', {
        templateUrl: 'views/image.html',
        controller: 'ImageController',
        resolve: {
          resolvedImage: ['ImageService', '$route', function (ImageService, $route) {
            return ImageService.getImage({key : $route.current.params.key});
          }]
        }
      })
      .when('/images', {
        templateUrl: 'views/images.html',
        controller: 'ImagesController',
        resolve: {
          resolvedImages: ['ImageService', function (ImageService) {
            return ImageService.getImages();
          }]
        }
      });
  }]);

