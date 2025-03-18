(function () {
  'use strict';

  angular.module('app.usersService', [])
    .factory('usersService', usersService);

  usersService.$inject = ['$http', '$log', '$q'];

  function usersService($http, $log, $q) {
    return {
      getUsers: getUsers
    };

    function getUsers() {
      return $http.get('assets/data/users.json')
        .then(getUsersComplete)
        .catch(getUsersFailed);

      function getUsersComplete(response) {
        return response.data;
      }

      function getUsersFailed(e) {
        const newMessage = 'XHR Failed for getUsers.';
        $log.error(newMessage);
        return $q.reject(e);
      }
    }
  }
})();
