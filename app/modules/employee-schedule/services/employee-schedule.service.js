'use strict';
angular.module('rbt.employee-schedule').factory('employeeSchedule', function ($q, $timeout) {

  var employeeSchedule = [];
  var receiveSchedulePromise = undefined;

  return {
    getEmployeeSchedule: getSchedule
  };


  function getSchedule(employeeId, month) {
    var employeeSchedulePromise = $q.defer();
    if (receiveSchedulePromise) {
      $timeout.cancel(receiveSchedulePromise);
    }
    receiveSchedulePromise = $timeout(function () {

      employeeSchedule = buildMonth(month);
      employeeSchedulePromise.resolve(employeeSchedule);
      receiveSchedulePromise = undefined;
    }, 500);

    return employeeSchedulePromise.promise;
  }

  function removeTime(date) {
    return date.day(1).hour(0).minute(0).second(0).millisecond(0);
  }

  function buildMonth(month) {
    var start = removeTime(month.clone().date(1));
    var days = [];
    var done = false, date = start.clone(), count = 0;
    while (!done) {
      angular.forEach(buildWeek(date.clone(), month), function (item) {
        days.push(item);
      });
      date.add(1, "w");
      done = count++ > 4;
    }
    return days;
  }

  function buildWeek(date, month) {
    var days = [];
    for (var i = 0; i < 7; i++) {
      if (date.month() === month.month()) {
        var dayType = generateRandom(4);
        days.push({
          date: date,
          dayType: dayType,
          visitedPoints: createRandomVisitedPoint(),
          questionnaires: createRandomVisitedPoint(),
          totalTime: createRandomTotalTime()
        });
      }

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
    return hour * 60 + minutes;
  }

  function createRandomVisitedPoint() {
    var total = generateRandom(100);
    return {current: generateRandom(total), total: total};
  }

});