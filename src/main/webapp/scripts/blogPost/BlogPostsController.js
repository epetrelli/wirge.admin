'use strict';

WirgeManageApp.controller('BlogPostsController', ['$scope', '$location', 'BlogPostService', 'resolvedBlogPosts',

  function ($scope, $location, blogPostService, resolvedBlogPosts) {

    $scope.pageMode = 'LIST';
    $scope.blogPost = {};
    $scope.blogPosts = resolvedBlogPosts;

    resolvedBlogPosts.$promise.then(function (resolvedBlogPosts) {
      console.log($scope.blogPosts.length + " blogPosts");
    });

    $scope.viewBlogPost = function(idBlogPost){
      console.log("goToBlogPost(" + idBlogPost + ")")
      $location.path('/blogPost/' + idBlogPost);
    }

    $scope.newBlogPost = function(){
      console.log("newBlogPost()")
      $scope.pageMode = 'NEW';
      $scope.blogPost = {};
    }
    $scope.cancelNewBlogPost = function(){
      console.log("cancelNewBlogPost()")
      $scope.blogPost = {};
      $scope.pageMode = 'LIST';
    }
    $scope.createBlogPost = function(){
      console.log("createBlogPost()")
      blogPostService.createBlogPost($scope.blogPost).$promise.then(
        function (blogPost) {
          console.log("BlogPost created with id " + blogPost.idBlogPost);
          $location.path("/blogPost/" +  blogPost.idBlogPost);
        }, function (reason) {
          console.log("error creating BlogPost (reason: " + reason + ")");
        });

    }

  }]);
