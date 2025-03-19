(function () {
  'use strict';

  angular.module('app', [
    'ui.router',
    'app.index',
    'app.modal.directive',
    'app.formInput.directive',
    'app.formValidation.directive',
    'app.users.list',
  ]);
})();
