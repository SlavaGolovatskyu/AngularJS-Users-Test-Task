(function () {
  'use strict';

  angular.module('app.users.list', ['ngAnimate', 'app.usersService'])
    .controller('UsersListController', UsersListController);

  UsersListController.$inject = ['$rootScope', '$scope', 'usersService'];

  function UsersListController($rootScope, $scope, usersService) {
    const vm = this;

    vm.deleteUser = usersService.deleteUser;

    vm.isModalOpen = false;
    vm.openModal = function () {
      vm.isModalOpen = true;
    };
    vm.closeModal = function () {
      vm.isModalOpen = false;
    }

    $scope.user = {
      username: '',
      firstName: '',
      lastName: '',
      email: '',
      type: '',
      password: '',
      repeatPassword: ''
    };
    
    $scope.types = ['Admin', 'Driver'];
    
    vm.createUser = function() {
      angular.forEach($scope.userForm, function(field, fieldName) {
        console.log(field, fieldName);
        if (field && fieldName[0] !== '$') {
          field.$setDirty();
          field.$validate();
        }
      });
    
      if ($scope.userForm.$valid) {
        usersService.createUser($scope.user)
      } else {
        console.error('Validation errors:', $scope.userForm.$error);
      }
    };
  }
})();