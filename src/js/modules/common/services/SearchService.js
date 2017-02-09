(function() {
    var services = angular.module('app.common.services');

    services.factory("SearchService", ['$http', 'GoogleBooksApi', 'GoogleMapsApi', 'TestApi', function($http, GoogleBooksApi, GoogleMapsApi, TestApi) {
        return {
            search: function(query, targetApi) {
                if(targetApi === "googleBooks") {
                    return GoogleBooksApi.search(query);
                }
                else if(targetApi === "googleMaps") {
                    return GoogleMapsApi.search(query);
                }
                else if(targetApi === "testApi") {
                    return TestApi.search(query);
                }
            }
        };
    }]);

}());
