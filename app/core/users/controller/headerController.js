(function () {
  'use strict';

  angular.module('app.header', ['ngAnimate', 'app.usersService'])
    .controller('HeaderController', HeaderController);

  HeaderController.$inject = ['$rootScope', '$timeout', '$scope', 'usersService'];

  function HeaderController($rootScope, $timeout, $scope, usersService) {
    const vm = this;

    vm.isCreateUserModalOpen = false;
    vm.isEditUserModalOpen = false;

    vm.userForm = {};
    vm.editUserForm = {};
    
    $scope.user = {};
    $scope.editUser = {};

    $scope.types = ['Admin', 'Driver'];

    vm.openCreateUserModal = () => vm.isCreateUserModalOpen = true;
    vm.openEditUserModal = () => vm.isEditUserModalOpen = true;

    vm.closeCreateUserModal = () => {
      vm.isCreateUserModalOpen = false;
      resetForm(vm.userForm, $scope.user);
    };

    vm.closeEditUserModal = () => {
      vm.isEditUserModalOpen = false;
      resetForm(vm.editUserForm, $scope.editUser);
    };

    function resetForm(form, model) {
      angular.copy({}, model);
      angular.forEach(form, (field, fieldName) => {
        if (field && fieldName[0] !== '$') {
          field.$setPristine();
          field.$setUntouched();
          field.$validate();
        }
      });

      form.$setPristine();
      form.$setUntouched();
    }

    vm.deleteUser = (username) => {
      usersService.deleteUser(username).then(vm.closeEditUserModal);
    };
    
    vm.createUser = () => {
      validateAndSubmitForm(vm.userForm, () => {
        usersService.createUser($scope.user).then(vm.closeCreateUserModal);
      });
    };

    vm.updateUser = () => {-
      validateAndSubmitForm(vm.editUserForm, () => {
        usersService.updateUser($scope.editUser).then(vm.closeEditUserModal);
      });
    };

    function validateAndSubmitForm(form, submitCallback) {
      angular.forEach(form, (field, fieldName) => {
        if (field && fieldName[0] !== '$') {
          field.$setDirty();
          field.$validate();
        }
      });
    
      if (form.$valid) {
        submitCallback();
      } else {
        console.error('Validation errors:', form.$error);
      }
    }

    $rootScope.$on('openEditUserModal', (event, data) => {
      $scope.editUser = { ...data };
      vm.openEditUserModal();
    });
  }
})();
