(function() {
    var controllers = angular.module('app.auth.controllers');

    controllers.controller('LogoutController', function($rootScope, $scope, $state, AuthService) {

        var init = function() {
            if (AuthService.userIsAuthenticated()) {
                AuthService.logout();
                $state.go("app.login");
                $rootScope.$broadcast('userLogOut');
            }
        }
        init();
    });
})();
