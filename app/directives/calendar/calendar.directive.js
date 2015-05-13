'use strict';
angular.module('rbt.directives').directive('calendar', /*@ngInject*/function ($timeout) {
  return {
    restrict: 'E',
    templateUrl: "assets/view/calendar/calendar.html",
    link: function (scope) {

      function _removeTime(date) {
        return date.day(1).hour(0).minute(0).second(0).millisecond(0);
      }

      function _buildMonth(scope, start, month) {
        scope.weeks = [];
        var done = false, date = start.clone(), count = 0;
        while (!done) {
          scope.weeks.push({days: _buildWeek(date.clone(), month, count)});
          date.add(1, "w");
          done = count++ > 4;
        }
      }

      function _buildWeek(date, month, weekCount) {
        var days = [];
        for (var i = 0; i < 7; i++) {
          days.push({
            name: date.format("dd").substring(0, 2),
            number: date.date() < 10 ? "0" + date.date() : date.date(),
            isCurrentMonth: date.month() === month.month(),
            isToday: date.isSame(new Date(), "day"),
            date: date,
            weekNumber: weekCount,
            dayType: generateRandom(4),
            visitedPoints: createRandomVisitedPoint(),
            questionnaires: createRandomVisitedPoint(),
            totalTime: createRandomTotalTime()
          });
          date = date.clone();
          date.add(1, "d");
        }
        return days;
      }

      function generateRandom(max) {
        return Math.floor(Math.random() * max);
      }

      function createRandomTotalTime() {
        var hour = generateRandom(14);
        var minutes = generateRandom(60);
        return (hour < 10 ? "0" + hour : hour) + ":" + (minutes < 10 ? "0" + minutes : minutes);
      }

      function createRandomVisitedPoint() {
        var total = generateRandom(100);
        return {current: generateRandom(total), total: total};
      }

      function _setMonth(month, scope) {
        scope.month = month;
        var start = month.clone();
        start.date(1);
        _removeTime(start.day(0));
        _buildMonth(scope, start, month);
      }

      scope.selectedDay = undefined;

      scope.isSelectedDay = function (day) {
        return !scope.selectedDay ? false : day.date.format('DD.MM.YYYY') === scope.selectedDay.format('DD.MM.YYYY');
      };

      scope.selectDay = function (day, event) {
        if (day.dayType === 1)
          scope.selectedDay = day.date;
        event.stopPropagation();
      };

      _setMonth(moment(), scope);


      scope.next = function () {
        var next = scope.month.clone();
        _setMonth(next.month(next.month() + 1), scope);
      };

      scope.previous = function () {
        var previous = scope.month.clone();
        _setMonth(previous.month(previous.month() - 1), scope);
      };

      scope.isInfoIconDay = function (day) {
        if (scope.infoIconDay && scope.infoIconDay.day && scope.infoIconDay.show)
          return day.date.format('DD.MM.YYYY') === scope.infoIconDay.day.date.format('DD.MM.YYYY');
        return false;
      };

      scope.prepareShowDayInfoIcon = function (day) {
        scope.infoIconDay = {
          day: day,
          show: false
        };
        scope.showDayInfoIconTimeout = $timeout(showInfoIcon, 700);
      };

      scope.cancelShowDayInfoIcon = function () {
        scope.infoIconDay.day = undefined;
        $timeout.cancel(scope.showDayInfoIconTimeout);
        hideInfoIcon();
      };

      function showInfoIcon() {
        if (scope.infoIconDay.day) {
          scope.infoIconDay.show = true;
          scope.selectedDay = scope.infoIconDay.day.date;
        }
      }

      function hideInfoIcon() {
        scope.infoIconDay.day = undefined;
      }

    },
    controllerAs: "calendar"
  };
});