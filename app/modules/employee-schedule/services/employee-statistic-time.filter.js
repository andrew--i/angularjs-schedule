'use strict';
angular.module('rbt.employee-schedule').filter('statisticTimeFilter', function () {
  return function (time) {
    if (time) {
      var hours = Math.trunc(time / 60);
      var minutes = time - 60 * hours;
      return prettyNumberString(hours) + ":" + prettyNumberString(minutes);
    } else
      return "0";
  };

  function prettyNumberString(num) {
    return num < 10 ? "0" + num : num;
  }
});