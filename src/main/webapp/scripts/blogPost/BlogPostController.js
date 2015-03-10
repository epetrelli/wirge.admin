'use strict';

WirgeManageApp.controller('BlogPostController', ['$scope', '$location', 'BlogPostService', 'resolvedBlogPost',

  function ($scope, $location, blogPostService, resolvedBlogPost) {

    $scope.blogPost = resolvedBlogPost;
    $scope.opened = false; //datepicker

    resolvedBlogPost.$promise.then(function (resolvedBlogPost) {

      console.log("BlogPost loaded: id=" + resolvedBlogPost.idBlogPost);

      $scope.deleteBlogPost = function(blogPost){

        var blogPostTodelete = {};
        blogPostTodelete.idBlogPost = blogPost.idBlogPost;

        blogPostService.deleteBlogPost({idBlogPost:blogPost.idBlogPost}).$promise.then(
          function () {
            console.log("BlogPost deleted");
            $location.path("/blogPosts");
          }, function (reason) {
            console.log("error deleting (reason: " + reason + ")");
          });
      }

      $scope.saveBlogPost = function(blogPost){

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

      // datepicker stuff:
      $scope.today = function() {
        $scope.blogPost.dhCreated = new Date();
      };

      $scope.datepickerFormat = 'dd/MM/yyyy';

      $scope.open = function($event) {
        console.log("*");
        $event.preventDefault();
        $event.stopPropagation();
        $scope.opened = true;
      };

      $scope.dateOptions = {
        formatYear: 'yyyy',
        startingDay: 1
      };


    });

  }]);
