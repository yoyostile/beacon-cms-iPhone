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

.factory('EventLogs', function($http, $q) {
  return {
    post: function(uuid, major, minor, proximity, rssi) {
      return $http.post('http://beacon-cms.herokuapp.com/event_logs.json', { event_log: { uuid: uuid, major: major, minor: minor, proximity: proximity, rssi: rssi } }).
      then(function(response) {
        console.log(response);
        return response;
      });
    }
  }
})
