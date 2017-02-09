(function() {

    // Define 3rd party dependencies
    angular.module('app.library', [
        'ngRoute',
        'ui.router',
        'ngSanitize',
        'mgcrea.ngStrap',
        'ngAnimate',
        'restangular'
    ]);

    // Define app module
    var app = angular.module('app', [
        'app.library',
        'app.api',
        'app.auth',
        'app.common',
        'app.templates'
    ]);

    // Google api config
    app.factory('$googleApiConfig', function appFactory() {
        var config = {
            api: {
                maxResults: 20,
                keys: {
                    // TODO get from sever
                    books: "AIzaSyC1G1dCl9TqfMfQPLIBqzzwE91UmneEYXo",
                    maps: "AIzaSyDLlrkFKpPFUKKAJ43wA3f1DFqrmTYS7P0"
                }
            }
        };
        return config;
    });

    // For route authentication
    app.run(function($rootScope, $state, AuthService) {
        $rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams) {
            if (toState.authenticate) {
                if (!AuthService.userIsAuthenticated()) {
                    // User isn’t authenticated
                    $state.transitionTo("app.login");
                    event.preventDefault();
                }
            }
        });
    });

    app.controller('MainController', function($scope, AuthService) {
        // TODO put here code for usage accross all the views
    });

})();
