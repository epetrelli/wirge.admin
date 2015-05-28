'use strict';

WirgeManageApp.controller('ImagesController', ['$scope', '$location', '$http', 'WirgeManageAppService', 'ImageService', 'resolvedImages',

  function ($scope, $location, $http, wirgeManageAppService, imageService, resolvedImages) {

    $scope.images = resolvedImages;
    $scope.newprofileImage = null;

    resolvedImages.$promise.then(function (resolvedImages) {
      $scope.resolvedImages = resolvedImages;
      console.log("Got " + $scope.resolvedImages.length + " images");
    });

    $scope.viewImage = function(key){
      console.log("viewImage(" + key + ")")
      $location.path('/image/' + key);
    }

    $scope.uploadFile = function(files) {
      $scope.newprofileImage = new FormData();
      //Take the first selected file
      $scope.newprofileImage.append("file", files[0]);
    }


    $scope.uploadPicture = function(){

      console.log("posting " + $scope.newprofileImage);

      $http.post(wirgeManageAppService.restUrl + '/images', $scope.newprofileImage, {
        transformRequest: angular.identity,
        headers: {'Content-Type': undefined}
      })
        .success(function(){
        })
        .error(function(){
        });
      return;

      imageService.createImage($scope.newprofileImage).$promise.then(
        function (storedImage) {
          console.log("storedImage created with id " + storedImage.idStoredImage);
        }, function (reason) {
          console.log("error creating storedImage (reason: " + reason + ")");
        });

    }


  }]);
