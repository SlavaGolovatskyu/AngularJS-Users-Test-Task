(function() {
  "use strict";

  angular.module('app.formValidation.directive', [])
    .directive('selectRequired', function() {
      return {
        require: 'ngModel',
        link: function(scope, element, attrs, ctrl) {
          const errorElement = element.parent().find('.error-message');
    
          function setError(show, message = '') {
            errorElement.text(message);
            errorElement.toggle(show);
            element.toggleClass('input-error', show);
          }
    
          ctrl.$validators.selectRequired = function(modelValue, viewValue) {
            if (ctrl.$pristine) {
              setError(false); // Hide error if untouched
              return true;
            }
    
            if (modelValue && modelValue !== '') {
              setError(false);
              return true;
            }
    
            setError(true, 'Please select an option');
            return false;
          };
    
          // Ensure the field is reset properly when the form is cleared
          scope.$watch(attrs.ngModel, function(newValue) {
            if (!newValue) {
              ctrl.$setPristine();
              ctrl.$setUntouched();
              setError(false); // Hide error when reset
            }
          });
    
          // Hide the error initially
          setError(false);
        }
      };
    })
    .directive('requiredValidator', function() {
      return {
        require: 'ngModel',
        link: function(scope, element, attrs, ctrl) {
          ctrl.$validators.required = function(modelValue, viewValue) {
            const errorElement = element.parent().parent().find('.error-message');

            if (ctrl.$pristine) {
              errorElement.hide();
              element.toggleClass('input-error', false);
              return true;
            }
            
            if (!ctrl.$dirty) {
              return;
            }

            const value = modelValue?.trim()?.length;

            if (!value) {
              errorElement.text('Field is required');
              errorElement.show();
              element.toggleClass('input-error', true);
              return false;
            } else {
              errorElement.text('');
              errorElement.hide();
              element.toggleClass('input-error', false)
              return true;
            }
          };
        }
      };
    })
    .directive('emailValidator', function() {
      const EMAIL_REGEXP = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

      return {
        require: 'ngModel',
        link: function(scope, element, attrs, ctrl) {
          ctrl.$validators.email = function(modelValue, viewValue) {
            const errorElement = element.parent().parent().find('.error-message');

            if (ctrl.$pristine) {
              errorElement.hide();
              element.removeClass('input-error');
              return true;
            }
            
            if (!ctrl.$dirty && ctrl.$isEmpty(modelValue)) {
              // Consider empty models to be valid
              return true;
            }

            if (EMAIL_REGEXP.test(viewValue)) {
              // Valid email
              errorElement.text('');
              errorElement.hide();
              element.toggleClass('input-error', false);
              return true;
            }
            
            // Invalid email
            element.toggleClass('input-error', true);
            errorElement.text('Please enter a valid email address');
            errorElement.show();
            return false;
          };
        }
      };
    })
    .directive('passwordValidator', function() {
      const PASSWORD_REGEXP = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

      return {
        require: 'ngModel',
        link: function(scope, element, attrs, ctrl) {
          ctrl.$validators.password = function(modelValue, viewValue) {
            const errorElement = element.parent().parent().find('.error-message');

            if (ctrl.$pristine) {
              errorElement.hide();
              element.removeClass('input-error');
              return true;
            }
            
            if (!ctrl.$dirty && ctrl.$isEmpty(modelValue)) {
              // Consider empty models to be valid unless requiredValidator is applied
              return true;
            }
    
            if (PASSWORD_REGEXP.test(viewValue)) {
              // Valid password
              errorElement.text('');
              errorElement.hide();
              element.toggleClass('input-error', false);
              return true;
            }
    
            // Invalid password
            element.toggleClass('input-error', true);
            errorElement.text('Password must be at least 8 characters long and contain at least one letter and one number');
            errorElement.show();
            return false;
          };
        }
      };
    })
    .directive('passwordMatchValidator', function() {
      return {
        require: 'ngModel',
        scope: {
          matchWith: '=' // Bind the other password field to compare with
        },
        link: function(scope, element, attrs, ctrl) {
          ctrl.$validators.passwordMatch = function(modelValue, viewValue) {
            const errorElement = element.parent().parent().find('.error-message');

            if (ctrl.$pristine) {
              errorElement.hide();
              element.removeClass('input-error');
              return true;
            }
            
            if (ctrl.$isEmpty(modelValue) || ctrl.$isEmpty(scope.matchWith)) {
              // If either field is empty, we won't show a mismatch error
              return true;
            }
    
            if (modelValue === scope.matchWith) {
              // Passwords match
              errorElement.text('');
              errorElement.hide();
              element.toggleClass('input-error', false);
              return true;
            }
    
            // Passwords do not match
            element.toggleClass('input-error', true);
            errorElement.text('Passwords do not match');
            errorElement.show();
            return false;
          };
    
          // Watch for changes in the password field to re-validate
          scope.$watch('matchWith', function() {
            ctrl.$validate();
          });
        }
      };
    });
})();