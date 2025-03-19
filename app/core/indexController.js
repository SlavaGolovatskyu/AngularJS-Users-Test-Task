(function () {
  'use strict';

  angular.module('app.index', ['app.usersService'])
    .controller('IndexController', IndexController);

  IndexController.$inject = ['$rootScope', '$scope', '$state', '$log', 'usersService'];

  function IndexController($rootScope, $scope, $state, $log, usersService) {
    const vm = this;

    vm.users = [];

    retrieve();

    $scope.$on('showForbiddenPage', function () {
      $state.go('forbidden'); // Redirect to the 403 page
    });

    $rootScope.$on('refetchUsers', retrieve);

    function retrieve() {
      return getUsers().then(function () {
        $log.info('Retrieved users');
      });
    }

    function getUsers() {
      return usersService.getUsers()
        .then(function (data) {
          vm.users = data;
          return vm.users;
        });
    }
  }
})();
