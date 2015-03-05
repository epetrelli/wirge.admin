'use strict';

WirgeManageApp.factory('BlogPostService', ['$resource', 'WirgeManageAppService',
  function ($resource, wirgeManageAppService) {
    return $resource(wirgeManageAppService.restUrl + '/blogPosts', {}, {

      // all posts:
      'getBlogPosts': { method: 'GET', withCredentials: true, isArray:true},

      // get single message:
      'getBlogPost': { method: 'GET', url: wirgeManageAppService.restUrl + '/blogPosts/:idBlogPost', withCredentials: true},

      // Create BlogPost:
      'createBlogPost': { method: 'POST', withCredentials: true},

      // Save BlogPost:
      'saveBlogPost': { method: 'PUT', withCredentials: true},

      // Delete BlogPost:
      'deleteBlogPost': { method: 'DELETE', url: wirgeManageAppService.restUrl + '/blogPosts/:idBlogPost', withCredentials: true}
    });
  }]);


