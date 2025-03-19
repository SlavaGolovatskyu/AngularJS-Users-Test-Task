(function () {
  'use strict';

  angular.module('app.users.list', ['ngAnimate', 'app.usersService'])
    .controller('UsersListController', UsersListController);

  UsersListController.$inject = ['$rootScope', '$log', '$scope', 'usersService'];

  function UsersListController($rootScope, $log, $scope, usersService) {
    const vm = this;

    $rootScope.$on('refetchUsers', retrieve);

    retrieve();

    vm.editUser = (user) => {
      $rootScope.$broadcast('openEditUserModal', user)
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