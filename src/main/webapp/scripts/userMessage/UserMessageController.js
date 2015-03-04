'use strict';

/**
 * @ngdoc function
 * @name WirgeApp.controller:UserMessageController
 * @description
 * # UserMessageController
 * Controller to send messages to the app
 */
WirgeApp.controller('UserMessageController', ['$scope', 'UserMessageService',

  function ($scope, userMessageService) {

    $scope.userMessage = {};

    $scope.sendUserMessage = function(){
      console.log('sendUserMessage()');
      userMessageService.createMessage($scope.userMessage).$promise.then(function (userMessage) {
        console.log('success: ' + userMessage);
        $scope.userMessage = userMessage;
        $('#userMessageConfirm').modal({show:true});
        $scope.userMessage = {};
      }, function (reason) {
        console.log(reason);
      });
    };

    if($('#mapholder').html()!==undefined){
      // Map setup:
      // create a map in the 'map' div, set the view to a given place and zoom
      var map = L.map('map').setView([45.43, 9.18], 14);
      L.Icon.Default.imagePath = '/';
      // add an OpenStreetMap tile layer
      L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map);
      // add a marker in the given location, attach some popup content to it and open the popup
      L.marker([45.423786, 9.168037]).addTo(map)
        .bindPopup('<img alt="WIRGE" src="/images/wirge_logo.png">')
        .openPopup();
    }
  }]);
