(function () {
  'use strict';

  angular.module('app.usersService', ['toaster'])
    .factory('usersService', usersService);

  usersService.$inject = ['$rootScope', '$http', '$log', '$q', 'toaster'];

  function usersService($rootScope, $http, $log, $q, toaster) {
    const API_BASE = 'api/v1.0/users';
    const TOAST_TIMEOUT = 3000;
    
    const service = {
      getUsers: getUsers,
      createUser: createUser,
      deleteUser: deleteUser
    };
    
    return service;

    /**
     * Fetches all users from the API
     * @returns {Promise} Promise resolving to users data
     */
    function getUsers() {
      return $http.get(API_BASE)
        .then(response => response.data)
        .catch(error => {
          $log.error('XHR Failed for getUsers.');
          return $q.reject(error);
        });
    }

    /**
     * Triggers a refetch of users data
     */
    function refetchUsers() {
      $rootScope.$broadcast('refetchUsers');
    }

    /**
     * Creates a new user
     * @param {Object} data - User data
     * @returns {Promise} Promise resolving after user creation
     */
    function createUser(data) {
      return $http.post(API_BASE, data)
        .then(handleSuccess('User created successfully'))
        .catch(handleError);
    }

    /**
     * Deletes a user by username
     * @param {string} username - Username to delete
     * @returns {Promise} Promise resolving after user deletion
     */
    function deleteUser(username) {
      return $http.delete(`${API_BASE}/${username}`)
        .then(handleSuccess('User deleted successfully'))
        .catch(handleError);
    }

    /**
     * Generic success handler for user operations
     * @param {string} message - Success message to display
     * @returns {Function} Success handler function
     */
    function handleSuccess(message) {
      return function() {
        refetchUsers();
        showToast('success', 'Success', message);
      };
    }

    /**
     * Generic error handler for user operations
     * @param {Object} err - Error object
     */
    function handleError(err) {
      const errorMessage = err.data?.error || 'error';
      showToast('error', 'Error', errorMessage);
      return $q.reject(err);
    }

    /**
     * Helper function to show toast notifications
     * @param {string} type - Toast type ('success' or 'error')
     * @param {string} title - Toast title
     * @param {string} body - Toast message body
     */
    function showToast(type, title, body) {
      toaster.pop({
        type: type,
        title: title,
        body: body,
        timeout: TOAST_TIMEOUT
      });
    }
  }
})();