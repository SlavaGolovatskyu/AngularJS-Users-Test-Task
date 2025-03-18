(function () {
  'use strict';

  angular.module('app.users.list', ['ngAnimate'])
    .controller('UsersListController', UsersListController);

  UsersListController.$inject = ['$rootScope', '$scope'];

  function UsersListController($rootScope, $scope) {
    const vm = this;

    vm.deleteUser = deleteUser;

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
          field.$setTouched();
          field.$setDirty();
          field.$validate();
        }
      });
    
      if ($scope.userForm.$valid) {
        console.log('User created:', $scope.user);
        alert('User created successfully!');
      } else {
        console.error('Validation errors:', $scope.userForm.$error);
      }
    };
    

    function deleteUser(user) {
      $scope.IC.users = $scope.IC.users.filter(function (item) {
        return user.username !== item.username;
      });
    }
  }
})();
