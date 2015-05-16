'use strict';
angular.module('rbt.employee-schedule').directive('calendarDay', /*@ngInject*/function (DAY_TYPES) {
  return {
    restrict: 'E',
    templateUrl: "assets/view/employee-schedule/directives/calendar-day/calendar-day.html",
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
        if (!newValue)
          scope.isEditDay = false;
      });

      scope.editDayTypes = [
        {
          dayType: DAY_TYPES.GREEN,
          caption: "Рабочий день",
          circle_class: "green-circle"
        },
        {
          dayType: DAY_TYPES.WHITE,
          circle_class: "white-circle",
          caption: "Не рабочий день"
        },
        {
          dayType: DAY_TYPES.ORANGE,
          circle_class: "orange-circle",
          caption: "Пропуск"
        },
        {
          dayType: DAY_TYPES.ORANGE,
          circle_class: "red-circle",
          caption: "Прогул"
        }
      ];
    }
  };
});