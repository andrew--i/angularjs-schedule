'use strict';
angular.module('rbt.directives').directive('calendarDay', /*@ngInject*/function () {
  return {
    restrict: 'E',
    templateUrl: "assets/view/calendar-day/calendar-day.html",
    scope: {
      day: "=",
      isSelectedDay: "=",
      isInfoIconDay: "=",
      isEmployeeInfoDay: "="
    },
    link: function (scope) {
      scope.editEmployeeDay = function (event) {
        event.stopPropagation();
        scope.isEditDay = true;
      };

      scope.$watch("isSelectedDay", function (newValue) {
        if(!newValue)
          scope.isEditDay = false;
      });
    }
  };
});