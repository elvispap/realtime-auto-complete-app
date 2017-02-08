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

    app.controller('MainController', function($scope, $app) {

        console.log("hello from MainController");



    });
})();
