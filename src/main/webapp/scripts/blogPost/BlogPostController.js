'use strict';

WirgeManageApp.controller('BlogPostController', ['$scope', '$location', 'BlogPostService', 'resolvedBlogPost',

  function ($scope, $location, blogPostService, resolvedBlogPost) {

    $scope.blogPost = resolvedBlogPost;


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

      $scope.saveBlogPost = function(blogPost){
        $scope.blogPost.txText = $('#txText').val();
        blogPostService.saveBlogPost(blogPost).$promise.then(
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

    });

  }]);
