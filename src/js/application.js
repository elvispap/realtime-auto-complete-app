(function() {

    // define 3rd party dependencies
    angular.module('app.library', [
        'ngRoute',
        'ui.router',
        'ngSanitize',
        'mgcrea.ngStrap',
        'ngAnimate',
        'restangular'
    ]);

    var app = angular.module('app', [
        'app.library',
        'app.api',
        'app.auth',
        'app.common',
        'app.templates'
    ]);

    app.factory('$app', function appFactory() {
        var app = {
            routes: {
                login: "/",
                home: "home"
            }
        };
        return app;
    });

    app.factory('$googleApiConfig', function appFactory() {
        var config = {
            api: {
                maxResults: 10,
                key: "AIzaSyATI2lGa3B3tmrpCmA54ZVUb-RIhZ-6Uhk" // Get from config (on auth)
            }
        };
        return config;
    });

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
