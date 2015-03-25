'use strict';

/**
 * Generic utility functions
 *
 */

WirgeManageApp.factory('WirgeManageAppService', ['$location',
  function ($location) {
    var urls = {};
    urls.appUrl = '/';
    if($location.host().indexOf("localhost")>-1) {
      urls.restUrl = 'http://localhost:8080/rest';
    }
    else {
      urls.restUrl = 'https://wirge-it-web.appspot.com/rest';
    }
    return urls;
  }
]);


