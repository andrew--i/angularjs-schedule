'use strict';
angular.module('rbt.employee-schedule').directive('employeeSelector', /*@ngInject*/function () {
  return {
    restrict: 'E',
    templateUrl: "assets/view/employee-schedule/directives/employee-selector/employee-selector.html"
  };
});