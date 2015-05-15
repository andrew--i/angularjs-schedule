'use strict';
angular.module('rbt.employee-schedule').factory('daysUtils', function () {
  return {
    isSameDate: isSameDate
  };

  function isSameDate(d1, d2) {
    if (!d1 || !d2)
      return false;
    return d1.format("DD.MM.YYYY") === d2.format("DD.MM.YYYY");
  }
});
