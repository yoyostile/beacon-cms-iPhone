angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, Entries) {
  $scope.currentBeacon = undefined;
  $scope.lastDate = new Date();

  $scope.getEntry = function(beacon) {
    console.log('CURRENT BEACON:' + JSON.stringify(beacon));
    Entries.get(beacon.uuid, beacon.major, beacon.minor).then(function(d) {
      $scope.entry = d;
      console.log('[DOM] DashCtrl -> Entries get promise: ' + JSON.stringify(d));
    });
  }

  $scope.compareBeacons = function(b1, b2) {
    if(b1 === undefined || b2 === undefined) return false;
    return b1.uuid == b2.uuid && b1.major == b2.major && b1.minor == b2.minor;
  }

  $scope.$on('foundBeacons', function(event, beacon) {
    var currentDate = new Date();
    if($scope.currentBeacon === undefined || (!$scope.compareBeacons($scope.currentBeacon, beacon) && Math.abs(currentDate - $scope.lastDate) > 5000)) {
      $scope.currentBeacon = beacon;
      console.log($scope.currentBeacon);
      $scope.getEntry($scope.currentBeacon);
      $scope.$apply();
      $scope.lastDate = currentDate;
    }
  });
})

.controller('EntriesCtrl', function($scope, Entries) {
  $scope.entries = Entries.all().then(function(d) {
    $scope.entries = d;
    console.log('[DOM] EntriesCtrl -> Entries all promise: ' + JSON.stringify(d));
  });
})

.controller('EntryDetailCtrl', function($scope, $stateParams, Entries) {
  Entries.get($stateParams.uuid, $stateParams.major, $stateParams.minor).then(function(d) {
    $scope.entry = d;
    console.log('[DOM] EntryDetailCtrl -> Entries get promise: ' + JSON.stringify(d));
  });
})

.controller('RangingCtrl', ['$rootScope', '$scope', '$localForage', '$ionicPlatform', function($rootScope, $scope, $localForage, $ionicPlatform) {
  $scope.regionJson = {
    uuid: 'eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee',
    identifier: 'blaufunk'
  };

  $ionicPlatform.ready(function() {
    $scope.region = new cordova.plugins.locationManager.BeaconRegion($scope.regionJson.identifier, $scope.regionJson.uuid);
    console.log($scope.region);
    var delegate = new cordova.plugins.locationManager.Delegate();

    delegate.didDetermineStateForRegion = function(pluginResult) {
      console.log(JSON.stringify(pluginResult));
      cordova.plugins.locationManager.appendToDeviceLog('[DOM] didDetermineStateForRegion: ' + JSON.stringify(pluginResult));
    };

    delegate.didStartMonitoringForRegion = function(pluginResult) {
      console.log('didStartMonitoringForRegion: ', pluginResult);
      cordova.plugins.locationManager.appendToDeviceLog('[DOM] didStartMonitoringForRegion: ' + JSON.stringify(pluginResult));
    }

    delegate.didRangeBeaconsInRegion = function(pluginResult) {
      // cordova.plugins.locationManager.appendToDeviceLog('[DOM] didRangeBeaconsInRegion: ' + JSON.stringify(pluginResult));
      $scope.beacons = pluginResult;
      $rootScope.$broadcast('foundBeacons', pluginResult.beacons[0]);
    }

    cordova.plugins.locationManager.setDelegate(delegate);

    cordova.plugins.locationManager.startRangingBeaconsInRegion($scope.region).fail(console.error).done(console.log("YES"));
  });
}]);
