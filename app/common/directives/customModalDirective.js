(function () {
  'use strict';

  angular.module('app.modal.directive', [])
    .directive('customModal', customModal);

  customModal.$inject = [];

  function customModal() {
    return {
      restrict: 'E',
      scope: {
        modalTitle: '@',  // Title passed as an attribute
        isOpen: '=',      // Two-way binding for opening/closing the modal
        closeModal: '&'   // Function to close the modal
      },
      transclude: true,  // Enable transclusion to allow dynamic content
      template: `
        <div class="custom-modal-overlay" ng-show="isOpen" ng-click="closeModal()">
          <div class="custom-modal" ng-click="$event.stopPropagation()">
            <div class="custom-modal-header">
              <h3 class="custom-modal-header__title">{{ modalTitle }}</h3>
              <button class="custom-close-button" ng-click="closeModal()">×</button>
            </div>
            <div class="custom-modal-body" ng-transclude></div>
            <div class="custom-modal-footer">
              <button class="button" ng-click="closeModal()">Close</button>
            </div>
          </div>
        </div>
      `
    };
  }
})();