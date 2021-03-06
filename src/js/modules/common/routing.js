(function () {

    var routing = angular.module('app.common.routing', ['ui.router', 'ngRoute']);

    routing.config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider
        .state('app', {
            abstract: true,
            url: '/app',
            templateUrl: 'common/templates/main.htm'
        })
        .state('app.login', {
            url: '/login',
            templateUrl: 'auth/templates/login.htm',
            controller: 'LoginController'
        })
        .state('app.logout', {
            url: '/logout',
            controller: 'LogoutController'
        })
        .state('app.home', {
            url: '/home',
            templateUrl: 'common/templates/home.htm',
            controller: 'HomeController',
            authenticate: true,
        });
        $urlRouterProvider.otherwise('/app/home');
        
      });
}());
