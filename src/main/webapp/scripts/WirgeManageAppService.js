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
      urls.serverUrl = 'http://localhost:8080';
    }
    else {
      urls.serverUrl = 'https://wirge-it-web.appspot.com';
    }
    urls.restUrl = urls.serverUrl + '/rest';
    return urls;
  }
]);


