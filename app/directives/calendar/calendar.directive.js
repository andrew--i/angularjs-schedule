'use strict';
angular.module('rbt.directives').directive('calendar', /*@ngInject*/function () {
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
            number: date.date() < 9 ? "0" + date.date() : date.date(),
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
        return (hour < 9 ? "0" + hour : hour) + ":" + (minutes < 9 ? "0" + minutes : minutes);
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
        return !scope.selectedDay ? false : day.date.format('DD.MM') === scope.selectedDay.format('DD.MM');
      };

      scope.selectDay = function (day) {
        if (day.dayType === 1)
          scope.selectedDay = day.date;
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
    },
    controllerAs: "calendar"
  };
});