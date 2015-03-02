angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, Entries) {
  var uuid = '123';
  var major = '456';
  var minor = '789';
  $scope.entry = Entries.get($scope, uuid, major, minor);
})

.controller('EntriesCtrl', function($scope, Entries) {
  Entries.all($scope);
})

.controller('EntryDetailCtrl', function($scope, $stateParams, Entries) {
  Entries.get($scope, $stateParams.uuid, $stateParams.major, $stateParams.minor);
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
