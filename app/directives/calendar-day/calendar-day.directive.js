'use strict';
angular.module('rbt.directives').directive('calendarDay', /*@ngInject*/function () {
  return {
    restrict: 'E',
    templateUrl: "assets/view/calendar-day/calendar-day.html",
    scope: {
      day: "=",
      selectedDay: "="
    },
    link: function (scope) {
      var s = scope;
    }
  };
});