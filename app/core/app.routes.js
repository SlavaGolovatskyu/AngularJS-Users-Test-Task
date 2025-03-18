(function () {
  'use strict';

  angular.module('app')
    .config(config);

  config.$inject = ['$stateProvider', '$urlRouterProvider'];

  function config($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.when('', '/users/list');
    $urlRouterProvider.when('/', '/users/list');
    $urlRouterProvider.when('/users', '/users/list');
    $urlRouterProvider.when('/users/', '/users/list');
    $urlRouterProvider.otherwise('/404');
    $stateProvider
      .state('root', {
        abstract: true,
        url: '/',
      })
      .state('root.users', {
        url: 'users',
        abstract: true,
      })
      .state('root.users.list', {
        url: '/list',
        views: {
          'header@': {
            controller: 'UsersListController',
            controllerAs: 'UsersListController',
            templateUrl: 'core/users/user/createUserView.html'
          },
          'content@': {
            templateUrl: 'core/users/listView.html',
            controller: 'UsersListController',
            controllerAs: 'TLC'
          }
        }
      })
      // 403 Forbidden
      .state('403', {
        url: '/403',
        views: {
          'content@': {
            templateUrl: 'core/errors/403.html'
          }
        }
      })
      // 404 Not Found
      .state('404', {
        url: '/404',
        views: {
          'content@': {
            templateUrl: 'core/errors/404.html'
          }
        }
      });
  }
})();
