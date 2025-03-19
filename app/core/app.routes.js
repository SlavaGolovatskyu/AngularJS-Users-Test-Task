(function () {
  'use strict';

  angular.module('app')
    .config(config);

  config.$inject = ['$stateProvider', '$locationProvider', '$urlRouterProvider'];

  function config($stateProvider, $locationProvider, $urlRouterProvider) {
    $locationProvider.hashPrefix('');

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
            controller: 'HeaderController',
            controllerAs: 'HeaderController',
            templateUrl: 'core/users/views/userModalView.html'
          },
          'content@': {
            templateUrl: 'core/users/views/listView.html',
            controller: 'UsersListController',
            controllerAs: 'UsersListController'
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
