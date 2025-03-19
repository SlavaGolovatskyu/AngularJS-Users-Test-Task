(function () {
  'use strict';

  angular.module('app.header', ['ngAnimate', 'app.usersService'])
    .controller('HeaderController', HeaderController);

  HeaderController.$inject = ['$rootScope', '$log', '$scope', 'usersService'];

  function HeaderController($rootScope, $log, $scope, usersService) {
    const vm = this;

    vm.isCreateUserModalOpen = false;
    vm.userForm = {};

    vm.isEditUserModalOpen = false;
    vm.editUserForm = {};

    vm.users = [];

    $scope.user = {};
    $scope.editUser = {};
    
    $scope.types = ['Admin', 'Driver'];

    vm.openCreateUserModal = () => vm.isCreateUserModalOpen = true;
    vm.openEditUserModal = () => vm.isEditUserModalOpen = true;

    vm.closeCreateUserModal = function () {
      vm.isCreateUserModalOpen = false;
      $scope.user = {}; // Reset the form

      angular.forEach(vm.userForm, function(field, fieldName) {
        if (field && fieldName[0] !== '$') {
          field.$setPristine();
          field.$setUntouched();
          field.$validate();
        }
      });

      vm.userForm.$setPristine();
      vm.userForm.$setUntouched();
    }

    vm.closeEditUserModal = () => {
      vm.isEditUserModalOpen = false;
      $scope.editUser = {}; // Reset the form

      angular.forEach(vm.editUserForm, function(field, fieldName) {
        if (field && fieldName[0] !== '$') {
          field.$setPristine();
          field.$setUntouched();
          field.$validate();
        }
      });

      vm.editUserForm.$setPristine();
      vm.editUserForm.$setUntouched();
    }

    vm.deleteUser = (username) => {
      usersService.deleteUser(username).then(vm.closeEditUserModal);
    };
    
    vm.createUser = function() {
      angular.forEach(vm.userForm, function(field, fieldName) {
        if (field && fieldName[0] !== '$') {
          field.$setDirty();
          field.$validate();
        }
      });
    
      if (vm.userForm.$valid) {
        usersService.createUser($scope.user).then(vm.closeCreateUserModal);
      } else {
        console.error('Validation errors:', vm.userForm.$error);
      }
    };

    $rootScope.$on('openEditUserModal', (event, data) => {
      $scope.editUser = data;
      vm.openEditUserModal();
      console.log('header controller', data);
    })
  }
})();