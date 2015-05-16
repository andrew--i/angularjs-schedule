'use strict';
angular.module('rbt.employee-schedule').directive('calendar', /*@ngInject*/function ($timeout, daysUtils) {
  return {
    restrict: 'E',
    scope: {
      "weeks": "="
    },
    templateUrl: "assets/view/employee-schedule/directives/calendar/calendar.html",
    link: function (scope) {

      scope.currentMonth = undefined;

      function setMonth(month, scope) {
        scope.currentMonth = month;
        scope.$emit("setup_month", month);
      }

      setMonth(moment(), scope);

      scope.selectedDay = undefined;

      scope.isSelectedDay = function (day) {
        return day.isCurrentMonth && daysUtils.isSameDate(scope.selectedDay, day.date);
      };

      scope.selectDay = function (day, event) {
        if (day.dayType === 1)
          scope.selectedDay = day.date;
        scope.employeeInfoDay = day.date;
        event.stopPropagation();
      };


      scope.next = function () {
        var next = scope.currentMonth.clone();
        setMonth(next.month(next.month() + 1), scope);
      };

      scope.previous = function () {
        var previous = scope.currentMonth.clone();
        setMonth(previous.month(previous.month() - 1), scope);
      };

      scope.isInfoIconDay = function (day) {
        if (scope.infoIconDay && scope.infoIconDay.day && scope.infoIconDay.show)
          return daysUtils.isSameDate(day.date, scope.infoIconDay.day.date);
        return false;
      };

      scope.startShowDayInfoIcon = function (day) {
        scope.infoIconDay = {
          day: day,
          show: false
        };
        scope.showDayInfoIconTimeout = $timeout(showInfoIcon, 300);
      };

      scope.isEmployeeInfoDay = function (day) {
        return daysUtils.isSameDate(day.date, scope.employeeInfoDay);
      };

      scope.$watch("selectedDay", function (newValue) {
        if (!daysUtils.isSameDate(scope.selectedDay, scope.employeeInfoDay)) {
          scope.employeeInfoDay = undefined;
        }
        if (!newValue) {
          cancelShowDayInfoIcon();
        }
      });

      function cancelShowDayInfoIcon() {
        if (scope.infoIconDay)
          scope.infoIconDay.day = undefined;
        $timeout.cancel(scope.showDayInfoIconTimeout);
      }

      function showInfoIcon() {
        if (scope.infoIconDay.day) {
          scope.infoIconDay.show = true;
          scope.selectedDay = scope.infoIconDay.day.date;
        }
      }
    },
    controllerAs: "calendar"
  };
});