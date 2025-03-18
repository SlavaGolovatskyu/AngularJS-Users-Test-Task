(function () {
  'use strict';

  angular.module('app.modal', [])
    .controller('ModalController', ModalController);

  ModalController.$inject = ['$scope'];

  function ModalController($scope) {
    var vm = this;

    vm.isModalOpen = false;

    // Open modal
    vm.openModal = function () {
      vm.isModalOpen = true;
    };

    // Close modal
    vm.closeModal = function () {
      vm.isModalOpen = false;
    };
  }
})();