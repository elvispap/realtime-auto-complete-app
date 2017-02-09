(function() {
    var controllers = angular.module('app.auth.controllers');

    controllers.controller('LoginController', function($rootScope, $scope, $state, AuthService) {

        var init = function() {
            if (!AuthService.userIsAuthenticated()) {
                $scope.login = function() {
                    if (AuthService.login($scope.username, $scope.password)) {
                        $state.go("app.home");
                        $rootScope.$broadcast('userLogin');
                    } else {
                        $state.go("app.login");
                    }
                };
            }
            else {
                $state.go("app.home");
            }
        }

        init();
    });
})();
