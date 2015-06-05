'use strict';

WirgeManageApp.controller('BlogPostController', ['$scope', '$location', 'WirgeManageAppService', 'BlogPostService', 'ImageService', 'resolvedBlogPost',

  function ($scope, $location, wirgeManageAppService, blogPostService, imageService, resolvedBlogPost) {

    $scope.blogPost = resolvedBlogPost;
    $scope.resolvedStoredImages = [];
    $scope.serverUrl = wirgeManageAppService.serverUrl;



    resolvedBlogPost.$promise.then(function (resolvedBlogPost) {

      console.log("BlogPost loaded: id=" + resolvedBlogPost.idBlogPost + " dhCreated=" + resolvedBlogPost.dhCreated);
      // datepicker stuff:
      $scope.datepickerFormat = 'dd/MM/yyyy';
      $scope.opened = false;
      $scope.today = function() {
        $scope.blogPost.dhCreated = new Date();
      };
      $scope.open = function($event) {
        console.log("opening datepicker");
        $event.preventDefault();
        $event.stopPropagation();
        $scope.opened = true;
      };
      $scope.dateOptions = {
        formatYear: 'yyyy',
        startingDay: 1
      };

      $scope.deleteBlogPost = function(blogPost){
        blogPostService.deleteBlogPost({idBlogPost:blogPost.idBlogPost}).$promise.then(
          function () {
            console.log("BlogPost deleted");
            $location.path("/blogPosts");
          }, function (reason) {
            console.log("error deleting (reason: " + reason + ")");
          });
      }

      $scope.saveBlogPost = function(){
        $scope.blogPost.txText = $('#txText').val();
        blogPostService.saveBlogPost($scope.blogPost).$promise.then(
          function (blogPost) {
            console.log("BlogPost saved: new date is " + blogPost.dhCreated);
            $scope.blogPost = blogPost;
          }, function (reason) {
            console.log("error saving (reason: " + reason + ")");
          });
      }

      $scope.backToBlogPosts = function() {
        $location.path("/blogPosts");
      }

      $scope.imageChooserSingleOpen = function(){
        imageService.getImages().$promise.then(function (resolvedStoredImages) {
          $scope.storedImages = resolvedStoredImages;
          $('#imageChooserSingle').modal();
        },
        function (reason) {
          console.log(reason);
        });
      }

      $scope.imageChooserMultipleOpen = function(){
        imageService.getImages().$promise.then(function (resolvedStoredImages) {
            $scope.storedImages = resolvedStoredImages;
            $('#imageChooserMultiple').modal();
          },
          function (reason) {
            console.log(reason);
          });
      }

      $scope.selectImageSingle = function(storedImage){
        $scope.blogPost.storedImage = storedImage;
        $('#imageChooserSingle').modal('hide');
      }

      $scope.selectImageMultiple = function(storedImage){
        $scope.blogPost.storedImages.push(storedImage);
      }

      $scope.deleteImageSingle = function(){
        $scope.blogPost.storedImage = null;
      }
      $scope.deleteImageMultiple = function(image){
        $scope.blogPost.storedImages.splice($scope.blogPost.storedImages.indexOf(image), 1);
      }

    });

  }]);
