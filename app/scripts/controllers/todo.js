'use strict';
angular.module('nexcapAngularApp').controller('TodoCtrl', function ($scope, Session, Todo) {
  $scope.Session = Session;
  $scope.newTodo = {is_complete: false};

  this.todos = Todo.query();

  this.populateTodos = function () {
    this.todos = Todo.query();
  };

  this.createTodo = function (newTodo) {
    Todo.save(newTodo);
    this.todos.push(angular.copy(newTodo));
    newTodo = {is_complete: false};
  };
  this.toggleTodo = function (todo) {
    todo.is_complete = !todo.is_complete;
    Todo.update(todo);
  };
});