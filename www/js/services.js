angular.module('starter.services', [])

.factory('Entries', function($http) {
  return {
    all: function($scope) {
      $http.get('http://beacon-cms.herokuapp.com/entries.json').
      success(function(data, status, headers, config) {
        $scope.entries = data.entries;
        console.log(data.entries);
      }).
      error(function(data, status, headers, config) {
        alert('Something went wrong: ' + data);
      })
      return null;
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
