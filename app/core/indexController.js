(function () {
  'use strict';

  angular.module('app.index', ['app.usersService'])
    .controller('IndexController', IndexController);

  IndexController.$inject = ['$rootScope', '$log', 'usersService'];

  function IndexController($rootScope, $log, usersService) {
    const vm = this;

    vm.users = [];

    retrieve();

    vm.openModal = function () {
      $rootScope.$broadcast('openModal');
    };

    vm.closeModal = function () {
      $rootScope.$broadcast('closeModal');
    };

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
