(function () {
  'use strict';

  angular.module('app.index', [])
    .controller('IndexController', IndexController);

  IndexController.$inject = ['$rootScope', '$scope', '$state'];

  function IndexController($rootScope, $scope, $state) {
    $scope.$on('showForbiddenPage', function () {
      $state.go('forbidden'); // Redirect to the 403 page
    });
  }
})();
