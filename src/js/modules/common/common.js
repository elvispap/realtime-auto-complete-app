(function () {
    var services = angular.module('app.common.services', ['restangular']);

    angular.module('app.common.routing', ['ui.router', 'ngRoute']);
    angular.module('app.common.directives', []);
    angular.module('app.common.filters', []);
    angular.module('app.common.controllers', []);

    angular.module('app.common', [
        'app.common.routing',
        'app.common.directives',
        'app.common.filters',
        'app.common.controllers'
    ]);
}());
