(function () {

    var api = angular.module('app.api', []);
    api.factory('$api', function (Restangular, $state) {

        return Restangular.withConfig(function (RestangularConfigurer, MessageAlertService) {

            var BASE_URL = "";

            RestangularConfigurer.setBaseUrl(BASE_URL);

            RestangularConfigurer.addResponseInterceptor(function (data, operation, what, uri, response, deferred) {
                if ((operation === 'getList' || operation === 'get') && 'items' in data) {
                    return data.items;
                }
                if ('item' in data) {
                    return data.item;
                }
                if ('items' in data) {
                    return data.items;
                }
                return data;
            });

            RestangularConfigurer.setDefaultHeaders({
                'X-Requested-With': 'XMLHttpRequest'
            });
        });
    });
}());
