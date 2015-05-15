'use strict';
angular.module('rbt.employee-schedule').factory('calendarDaysGenerator', function (daysUtils) {

  return {
    generate: buildMonth,
    generateEmployeeCalendar: generateEmployeeCalendar
  };

  function removeTime(date) {
    return date.day(1).hour(0).minute(0).second(0).millisecond(0);
  }

  function generateEmployeeCalendar(employeeCalendar, month) {
    var weeks = buildMonth(month);
    for (var i = weeks.length - 1; i > -1; i--) {
      var week = weeks[i];
      for (var j = week.days.length - 1; j > -1; j--) {
        var day = week.days[j];
        for (var k = employeeCalendar.length - 1; k > -1; k--) {
          var employeeDay = employeeCalendar[k];
          if (daysUtils.isSameDate(day.date, employeeDay.date)) {
            angular.extend(day, employeeDay);
          }
        }
      }
    }
    return weeks;
  }

  function buildMonth(month) {
    var start = removeTime(month.clone().date(1));
    var weeks = [];
    var done = false, date = start.clone(), count = 0;
    while (!done) {
      weeks.push({days: buildWeek(date.clone(), month, count)});
      date.add(1, "w");
      done = count++ > 4;
    }
    return weeks;
  }

  function buildWeek(date, month, weekCount) {
    var days = [];
    for (var i = 0; i < 7; i++) {
      days.push({
        name: date.format("dd").substring(0, 2),
        number: date.date() < 10 ? "0" + date.date() : date.date(),
        isCurrentMonth: date.month() === month.month(),
        isToday: date.isSame(new Date(), "day"),
        date: date,
        weekNumber: weekCount
      });
      date = date.clone();
      date.add(1, "d");
    }
    return days;
  }
});