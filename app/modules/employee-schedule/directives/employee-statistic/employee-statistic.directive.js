'use strict';
angular.module('rbt.employee-schedule').directive('employeeStatistic', /*@ngInject*/function () {
  return {
    restrict: 'E',
    templateUrl: "assets/view/employee-schedule/directives/employee-statistic/employee-statistic.html",
    link: function (scope) {

    },
    controllerAs: "employeeStatistic",
    controller: function ($scope, employeeSchedule) {
      $scope.getWorkDays = employeeSchedule.getWorkDays
    }
  };
});