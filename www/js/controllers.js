angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, Entries) {
  var uuid = '123';
  var major = '456';
  var minor = '789';
  Entries.get(uuid, major, minor).then(function(d) {
    $scope.entry = d;
  });
})

.controller('EntriesCtrl', function($scope, Entries) {
  $scope.entries = Entries.all().then(function(d) { $scope.entries = d; });
})

.controller('EntryDetailCtrl', function($scope, $stateParams, Entries) {
  Entries.get($stateParams.uuid, $stateParams.major, $stateParams.minor).then(function(d) {
    $scope.entry = d;
  });
})

.controller('FriendsCtrl', function($scope, Friends) {
  $scope.friends = Friends.all();
})

.controller('FriendDetailCtrl', function($scope, $stateParams, Friends) {
  $scope.friend = Friends.get($stateParams.friendId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
