'use strict';

WirgeManageApp.controller('ImagesController', ['$scope', '$location', '$http', 'ImageService', 'resolvedImages',

  function ($scope, $location, $http, ImageService, resolvedImages) {

    $scope.images = resolvedImages;
    $scope.uploadUrl = {};
    $scope.newprofileImage = null;

    resolvedImages.$promise.then(function (resolvedImages) {
      console.log($scope.images.length + " images");

      ImageService.getUploadUrl().$promise.then(function (uploadUrl) {
        console.log("UploadUrl = " + uploadUrl.url);
        $scope.uploadUrl = uploadUrl;
      });
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

      console.log("posting to " + $scope.uploadUrl.url + " image " + $scope.newprofileImage);

      $http.post($scope.uploadUrl.url, $scope.newprofileImage, {
        headers: {'Content-Type': undefined},
        transformRequest: angular.identity
      })
        .success(function(data){
          console.log("success");
          console.log(data);
        })
        .error(function(data) {
          console.log("failure");
          console.log(data);
        });
    }


  }]);
