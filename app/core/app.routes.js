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
    $urlRouterProvider.otherwise('/not-found');
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
      .state('forbidden', {
        url: '/forbidden',
        views: {
          'content@': {
            templateUrl: 'core/errors/403.html'
          }
        }
      })
      // 404 Not Found
      .state('notFound', {
        url: '/not-found',
        views: {
          'content@': {
            templateUrl: 'core/errors/404.html'
          }
        }
      });
  }
})();
