angular.module('starter.services', [])

.factory('Entries', function($http) {
  return {
    all: function() {
      return [];
    },
    get: function($scope, uuid, major, minor) {
      $http.get('http://beacon-cms.herokuapp.com/' + uuid + '/' + major + '/' + minor + '.json').
      success(function(data, status, headers, config) {
        $scope.entry = data.entry;
        console.log(data.entry);
      }).
      error(function(data, status, headers, config) {
        alert('Something went wrong: ' + data);
      });
      return null;
    }
  }
})
