'use strict';

WirgeManageApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider
      .when('/blogPost/:idBlogPost', {
        templateUrl: 'views/blogPost.html',
        controller: 'BlogPostController',
        resolve: {
          resolvedBlogPost: ['BlogPostService', '$route', function (BlogPostService, $route) {
            return BlogPostService.getBlogPost({idBlogPost : $route.current.params.idBlogPost});
          }]
        }
      })
      .when('/blogPosts', {
        templateUrl: 'views/blogPosts.html',
        controller: 'BlogPostsController',
        resolve: {
          resolvedBlogPosts: ['BlogPostService', function (BlogPostService) {
            return BlogPostService.getBlogPosts();
          }]
        }
      });
  }]);

