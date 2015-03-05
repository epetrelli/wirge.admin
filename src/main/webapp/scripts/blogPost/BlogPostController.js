'use strict';

WirgeManageApp.controller('BlogPostController', ['$scope', '$location', 'BlogPostService', 'resolvedBlogPost',

  function ($scope, $location, blogPostService, resolvedBlogPost) {

    $scope.blogPost = resolvedBlogPost;

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

        blogPostService.saveBlogPost($scope.blogPost).$promise.then(
          function (blogPost) {
            console.log("BlogPost saved");
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
