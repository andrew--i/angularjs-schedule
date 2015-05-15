'use strict';
angular.module('rbt.employee-schedule').directive('calendar', /*@ngInject*/function ($timeout, calendarDaysGenerator, employeeSchedule, daysUtils) {
  return {
    restrict: 'E',
    templateUrl: "assets/view/employee-schedule/directives/calendar/calendar.html",
    link: function (scope) {

      var currentMonth = undefined;

      function setMonth(month, scope) {
        currentMonth = month;
        scope.weeks = calendarDaysGenerator.generate(month);
        employeeSchedule.getEmployeeSchedule(undefined, currentMonth).then(function (result) {
          scope.weeks = calendarDaysGenerator.generateEmployeeCalendar(result, month)
        })
      }

      setMonth(moment(), scope);

      scope.selectedDay = undefined;

      scope.isSelectedDay = function (day) {
        return daysUtils.isSameDate(scope.selectedDay, day.date);
      };

      scope.selectDay = function (day, event) {
        if (day.dayType === 1)
          scope.selectedDay = day.date;
        scope.employeeInfoDay = day.date;
        event.stopPropagation();
      };


      scope.next = function () {
        var next = currentMonth.clone();
        setMonth(next.month(next.month() + 1), scope);
      };

      scope.previous = function () {
        var previous = currentMonth.clone();
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