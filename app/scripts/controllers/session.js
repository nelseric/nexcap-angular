'use strict';
/**
 * @ngdoc function
 * @name nexcapAngularApp.controller:SessionCtrl
 * @description
 * # SessionCtrl
 * Controller of the nexcapAngularApp
 */
angular.module('nexcapAngularApp').controller('SessionCtrl', function($cookies, $http, $scope, Session) {
  $scope.Session = Session;
  $scope.sessionModel = {
    newUser: false
  };


  this.signIn = function(loginData){
    if(loginData.newUser){
      Session.signUp(loginData.email, loginData.password);
    } else {
      Session.signIn(loginData.email, loginData.password);
    }
  };

  this.signOut = function(){
    $scope.sessionModel = {
      newUser: false
    };
    Session.signOut();
  };
});