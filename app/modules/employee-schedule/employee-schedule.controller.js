'use strict';
angular.module('rbt.employee-schedule').controller('EmployeeSchedule', function ($scope, calendarDaysGenerator, employeeSchedule, DAY_TYPES) {
  var controller = this;

  controller.employee = {
    fio: "Пономарев Никита Александрович",
    staffing: "Старший супервайзер",
    tel: "+7 (918) 980-04-25",
    workSince: "12 апреля 2013г."
  };
  controller.employeeStatistic = undefined;


  $scope.$on("setup_month", function (event, month) {
    controller.month = month;
    updateEmployeeSchedule(controller.employee, controller.month);
  });

  $scope.$on("setup_employee", function (event, employee) {
    controller.employee = employee;
    updateEmployeeSchedule(controller.employee, controller.month);
  });

  $scope.$watchCollection("weeks", function () {
    updateEmployeeStatistics($scope.weeks, controller.month);
  });

  function updateEmployeeSchedule(employee, month) {
    if (employee) {
      employeeSchedule.getEmployeeSchedule(employee, month).then(function (result) {
        $scope.weeks = calendarDaysGenerator.generateEmployeeCalendar(result, month);
      });
    } else {
      $scope.weeks = calendarDaysGenerator.generate(month);
    }
  }

  function updateEmployeeStatistics(weeks, month) {
    var workDays = 0;
    var notWorkDays = 0;
    var missDays = 0;
    var vacationDays = 0;
    var workTime = 0;
    var visitedPointsCurrent = 0;
    var visitedPointsTotal = 0;
    var sentReportCurrent = 0;
    var sentReportTotal = 0;

    angular.forEach(weeks, function (week) {
      angular.forEach(week.days, function (day) {
        if (!day.isCurrentMonth) {
          return;
        }
        var dayType = day.dayType;
        if (dayType === DAY_TYPES.WHITE) {
          notWorkDays++;
        } else if (dayType === DAY_TYPES.GREEN) {
          workDays++;
        } else if (dayType === DAY_TYPES.ORANGE) {
          vacationDays++;
        } else if (dayType === DAY_TYPES.RED) {
          missDays++;
        }
        visitedPointsCurrent += day.visitedPoints.current;
        visitedPointsTotal += day.visitedPoints.total;

        sentReportCurrent += day.questionnaires.current;
        sentReportTotal += day.questionnaires.total;
        workTime += day.totalTime;
      });
    });

    controller.employeeStatistic = {
      workDays: workDays,
      notWorkDays: notWorkDays,
      missDays: missDays,
      vacationDays: vacationDays,
      workTime: workTime,
      visitedPointsPercents: Math.floor((visitedPointsCurrent / visitedPointsTotal) * 100),
      sentReportPercents: Math.floor((sentReportCurrent / sentReportTotal) * 100)
    };
  }
});
