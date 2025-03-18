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
    
    $scope.createUser = function() {
      console.log($scope.userForm);
      if ($scope.userForm.$valid) {
        console.log('User created:', $scope.user);
        // Here you would typically submit to your backend
        alert('User created successfully!');
      } else {
        // Mark all fields as touched to trigger validation
        angular.forEach($scope.userForm.$error, function(field) {
          angular.forEach(field, function(errorField) {
            errorField.$setTouched();
          });
        });
      }
    };

    function deleteUser(user) {
      $scope.IC.users = $scope.IC.users.filter(function (item) {
        return user.username !== item.username;
      });
    }
  }
})();
