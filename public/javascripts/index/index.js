angular.module('index', [])
  .controller('indexCtrl', function($scope, $http) {
    $scope.login = function (fbResponse) {
      $http.post("/login", {userInfo : fbResponse})
        .success(function (response) {
          window.location.href = response.redirectTo;
        })
        .error(function(response) {
          //show err msg
        });
    };

    window.login = $scope.login;
  });