'use strict';

angular.module('nexcapAngularApp')
.factory('Todo', ["$resource", "Session", function TodoFactory($resource, Session){
  return $resource("http://localhost:3000/users/:user_id/todos/:id", {
    user_id: Session.userId,
    api_token: Session.apiToken,
    id: "@id"
  },{
    update: {
      method: "PUT"
    }
  });
}]);