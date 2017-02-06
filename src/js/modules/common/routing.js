(function () {

    var routing = angular.module('app.common.routing', ['ui.router', 'ngRoute']);

    routing.config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider
        .state('app', {
            abstract: true,
            url: '/app',
            templateUrl: 'common/templates/main.htm'
        })
        .state('app.home', {
            url: '/home',
            templateUrl: 'common/templates/home.htm'
        });
        $urlRouterProvider.otherwise('/app/home');
      });
}());
