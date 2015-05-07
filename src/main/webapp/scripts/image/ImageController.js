'use strict';

WirgeManageApp.controller('ImageController', ['$scope', '$location', 'ImageService', 'resolvedImage',

  function ($scope, $location, ImageService, resolvedImage) {

    $scope.image = resolvedImage;

    resolvedImage.$promise.then(function (resolvedImage) {

      console.log("resolvedImage loaded: key=" + resolvedImage.key);

      $scope.backToImages = function() {
        $location.path("/images");
      }

    });

  }]);
