'use strict';

angular.module('nexcapAngularApp')
.factory('Session', ["$http", "$cookies", function SessionFactory($http, $cookies){
  var Session = {
    userId: "",
    apiToken: "",
    email: "",
    signedIn: false,
    saveSession: function() {
      $cookies.put("userId", this.userId);
      $cookies.put("apiToken", this.apiToken);
      $cookies.put("email", this.email);
      $cookies.put("signedIn", this.signedIn);
    },
    loadSession: function() {
      this.userId = $cookies.get("userId") || this.userId;
      this.apiToken = $cookies.get("apiToken") || this.apiToken;
      this.email = $cookies.get("email") || this.email;
      this.signedIn = ($cookies.get("signedIn") === "true");
    },
    newSession: function(response) {
      this.userId = response.id;
      this.apiToken = response.api_token;
      this.email = response.email;
      this.signedIn = true;
      this.saveSession();
    },
    clearSession: function(response) {
      this.userId = "";
      this.apiToken = "";
      this.email = "";
      this.signedIn = false;
      this.saveSession();
    },

    signUp: function(email, password){
      var session = this;
      $http.post(
        "http://localhost:3000/users",
        {
          email: email,
          password: password
        }
      ).success(function(response){
        session.newSession(response);
      });
    },

    signIn: function(email, password){
      var session = this;
      $http.post(
        "http://localhost:3000/users/sign_in",
        {
          email: email,
          password: password
        }
      ).success(function(response){
        session.newSession(response);
      });
    },

    signOut: function(){
      var session = this;
      $http.delete("http://localhost:3000/users/sign_out.json",
        {
          params: {
            user_id: session.userId,
            api_token: session.apiToken
          }
        }
      ).success(function(response){
        session.clearSession(response);
      });
    }
  }
  Session.loadSession();
  return Session
}]);
