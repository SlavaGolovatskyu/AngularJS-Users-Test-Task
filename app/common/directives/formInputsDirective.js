(function() {
  "use strict";
  // Custom Input Directive
  angular.module('app.formInput.directive', [])
    // Text Input Directive
    .directive('customTextInput', function() {
      return {
        restrict: 'E',
        require: 'ngModel',
        scope: {
          fieldModel: '=ngModel',
          fieldName: '@name',
          fieldLabel: '@label',
          required: '@',
          placeholder: '@',
          fieldReadOnly: '@'
        },
        template: `
          <div class="form-group">
            <label class="form-group__label" ng-if="fieldLabel">{{fieldLabel}}<span ng-if="required">*</span></label>
            <input type="text" 
              ng-readonly="fieldReadOnly"
              class="form-control" 
              id="{{fieldName}}" 
              name="{{fieldName}}" 
              ng-model="fieldModel" 
              placeholder="{{placeholder}}"
              required-validator="required"
            />
            <div class="error-message"></div>
          </div>
        `,
        link: function(scope, element, attrs, ctrl) {}
      };
    })
    // Email Input Directive
    .directive('customEmailInput', function() {
      return {
        restrict: 'E',
        require: 'ngModel',
        scope: {
          fieldModel: '=ngModel',
          fieldName: '@name',
          fieldLabel: '@label',
          required: '@',
          placeholder: '@'
        },
        template: `
          <div class="form-group">
            <label ng-if="fieldLabel">{{fieldLabel}}<span ng-if="required">*</span></label>
            <div class="email-input-wrapper">
              <span class="email-prefix">@</span>
              <input type="email" 
                class="form-control" 
                id="{{fieldName}}" 
                name="{{fieldName}}" 
                ng-model="fieldModel" 
                placeholder="{{placeholder}}"
                ng-required="required"
                email-validator
              />
            </div>
            <div class="error-message"></div>
          </div>
        `,
        link: function(scope, element, attrs, ctrl) {}
      };
    })
    // Password Input Directive
    .directive('customPasswordInput', function() {
      return {
        restrict: 'E',
        require: 'ngModel',
        scope: {
          fieldModel: '=ngModel',
          fieldName: '@name',
          fieldLabel: '@label',
          required: '@',
          placeholder: '@',
          matchWith: '=',
          matchWithRequired: '@',
        },
        template: `
          <div class="form-group">
            <label ng-if="fieldLabel">{{fieldLabel}}<span ng-if="required">*</span></label>
            <input type="password" 
              class="form-control" 
              id="{{fieldName}}" 
              name="{{fieldName}}" 
              ng-model="fieldModel" 
              placeholder="{{placeholder}}"
              ng-required="required"
              password-validator
              password-match-validator="{{matchWithRequired}}"
              match-with="matchWith"
            />
            <div class="error-message"></div>
          </div>
        `,
        link: function(scope, element, attrs, ctrl) {}
      };
    })
})();