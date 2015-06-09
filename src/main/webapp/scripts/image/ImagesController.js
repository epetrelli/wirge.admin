'use strict';

WirgeManageApp.controller('ImagesController', ['$scope', '$location', '$http', 'WirgeManageAppService', 'ImageService', 'resolvedImages',

  function ($scope, $location, $http, wirgeManageAppService, imageService, resolvedImages) {

    $scope.resolvedImages = resolvedImages;
    $scope.newprofileImage = null;
    $scope.errors = [];
    $scope.serverUrl = wirgeManageAppService.serverUrl;

    resolvedImages.$promise.then(function (resolvedImages) {
      $scope.resolvedImages = resolvedImages;
      console.log("Got " + $scope.resolvedImages.length + " images");
    });

    $scope.viewImage = function (key) {
      console.log("viewImage(" + key + ")")
      $location.path('/image/' + key);
    }

    $scope.uploadFile = function (files) {
      //Take the first selected file
      $scope.newprofileImage = new FormData();
      $scope.newprofileImage.append("file", files[0]);
    }

    $scope.uploadPicture = function () {

      console.log("posting " + $scope.newprofileImage);
      $scope.errors = [];

      $http.post(wirgeManageAppService.restUrl + '/images', $scope.newprofileImage, {
        //transformRequest: angular.identity,
        headers: {'Content-Type': undefined}
      })
      .success(function () {
          console.log("Success");
          $scope.resolvedImages = imageService.getImages();
      })
      .error(function (reason) {
          console.log("Error posting image: " + reason.code);
          if(reason.code===409){
            $scope.errors.push("An image with the same name has already been loaded.");
          }
          else{
            $scope.errors.push("Got " + reason.code + " from server: " + reason.reasonPhrase + " - " + reason.description);
          }
      });
    }

    $scope.deleteImage = function(image){
      console.log("deleteImage(" + image.idStoredImage + ")");

      imageService.deleteImage({idStoredImage:image.idStoredImage}).$promise.then(
        function () {
          console.log("Image " + image.nmFile + " deleted");
          $scope.resolvedImages = imageService.getImages();
        },
        function (reason) {
          console.log("Got " + reason.code + " from server: " + reason.reasonPhrase + " - " + reason.description + " while deleting image " + image.nmFile);
        });

      return false;
    }

  }]);
