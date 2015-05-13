'use strict';

angular.module('rbt.mis')
  .config(/*@ngInject*/function ($controllerProvider, $compileProvider, $filterProvider, $provide, $httpProvider,
                                 $urlRouterProvider, $stateProvider) {

    angular.module('rbt.mis').register = {
      controller: $controllerProvider.register,
      directive: $compileProvider.directive,
      filter: $filterProvider.register,
      factory: $provide.factory,
      service: $provide.service
    };

    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state('home', {
        url: '/'
      });
  });