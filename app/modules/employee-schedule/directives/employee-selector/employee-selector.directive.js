'use strict';
angular.module('rbt.employee-schedule').directive('employeeSelector', /*@ngInject*/function () {
  return {
    restrict: 'E',
    templateUrl: "assets/view/employee-schedule/directives/employee-selector/employee-selector.html",
    scope: {
      "employee": "="
    },
    link: function (scope) {
      scope.$watch("employee.fio", function () {
        scope.$emit("setup_employee", scope.employee);
      });
    }
  };
});