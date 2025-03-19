(function () {
  'use strict';

  angular.module('app')
    .factory('authInterceptor', authInterceptor)
    .config(config);

  authInterceptor.$inject = ['$q', '$rootScope', '$log'];

  function authInterceptor($q, $rootScope, $log) {
    return {
      responseError: function (rejection) {
        if (rejection.status === 403) {
          $log.warn('403 Forbidden detected, triggering forbidden page redirect...');
          $rootScope.$broadcast('showForbiddenPage'); // Broadcast an event to handle the redirect
        }
        return $q.reject(rejection);
      }
    };
  }

  config.$inject = ['$httpProvider'];

  function config($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  }
})();
