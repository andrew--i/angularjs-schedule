'use strict';
angular.module('rbt.employee-schedule').factory('employeeSchedule', function ($q, $timeout, DAY_TYPES) {

  var employeeSchedule = [];
  var receiveSchedulePromise = undefined;
  var workDays = undefined;

  return {
    getEmployeeSchedule: getSchedule,
    getWorkDays: getWorkDays

  };

  function getWorkDays() {
    return workDays;
  }

  function getSchedule(employeeId, month) {
    workDays = undefined;
    var employeeSchedulePromise = $q.defer();
    if (receiveSchedulePromise)
      $timeout.cancel(receiveSchedulePromise);
    receiveSchedulePromise = $timeout(function () {
      workDays = 0;
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
      angular.forEach(buildWeek(date.clone()), function (item) {
        days.push(item);
      });
      date.add(1, "w");
      done = count++ > 4;
    }
    return days;
  }

  function buildWeek(date) {
    var days = [];
    for (var i = 0; i < 7; i++) {
      var dayType = generateRandom(4);
      if (dayType == DAY_TYPES.GREEN) {
        workDays++;
      }
      days.push({
        date: date,
        dayType: dayType,
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

});