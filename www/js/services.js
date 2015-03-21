angular.module('starter.services', [])

.factory('Entries', function($http, $q) {
  return {
    all: function() {
      return $http.get('http://beacon-cms.herokuapp.com/entries.json').
      then(function(response) {
        return response.data.entries;
      });
    },
    get: function(uuid, major, minor) {
      return $http.get('http://beacon-cms.herokuapp.com/' + uuid.toLowerCase() + '/' + major + '/' + minor + '.json').
      then(function(response) {
        return response.data.entry;
      });
    }
  }
})
