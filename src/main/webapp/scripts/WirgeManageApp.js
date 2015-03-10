'use strict';

var WirgeManageApp = angular.module('WirgeManageApp', ['ngAnimate','ngCookies','ngMessages','ngResource','ngRoute','ngSanitize','ngTouch','ui.bootstrap']);

WirgeManageApp.config(['$routeProvider', '$httpProvider',
  function ($routeProvider, $httpProvider) {

    //Converts java dates in json to js-Date

    $httpProvider.defaults.transformResponse.push(function (responseData) {
      convertDtFieldsToDates(responseData);
      return responseData;
    });

  }]);

//*** Temp fix for Angular 1.3 support [#2659](https://github.com/angular-ui/bootstrap/issues/2659)
WirgeManageApp.directive('datepickerPopup', ['datepickerPopupConfig', 'dateParser', 'dateFilter', function (datepickerPopupConfig, dateParser, dateFilter) {
  return {
    'restrict': 'A',
    'require': '^ngModel',
    'link': function ($scope, element, attrs, ngModel) {
      var dateFormat;

      attrs.$observe('datepickerPopup', function(value) {
        dateFormat = value || datepickerPopupConfig.datepickerPopup;
        ngModel.$render();
      });

      ngModel.$formatters.push(function (value) {
        return ngModel.$isEmpty(value) ? value : dateFilter(value, dateFormat);
      });
    }
  };
}]);

function convertDtFieldsToDates(input) {
  // Ignore things that aren't objects.
  if (typeof input !== "object") return input;

  for (var key in input) {

    if (!input.hasOwnProperty(key)) continue;

    if(input[key]==null) continue;


    var value = input[key];

    if(key.indexOf("dh")==0 || key.indexOf("dt")==0){
      //console.log("-" + key + "=" + value);
      if(!isNaN(value)) {
        input[key] = new Date(value);
        console.log(" -" + key + " now is a date (" + input[key] + ")");
      }
      else {
        //Skipping for retro-compatibility
        continue;
        var milliseconds = Date.parse(value)
        if (!isNaN(milliseconds)) {
          input[key] = new Date(milliseconds);
        }
      }
    } else if (typeof value === "object") {
      // Recurse into object
      convertDtFieldsToDates(value);
    }
  }
}
