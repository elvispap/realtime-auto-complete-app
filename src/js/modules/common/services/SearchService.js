(function() {
    var services = angular.module('app.common.services');

    services.factory("SearchService", ['$http', 'GoogleBooksApi', function($http, GoogleBooksApi) {
        return {
            search: function(query, targetApi) {
                if(targetApi === "googleBooks") {
                    return GoogleBooksApi.search(query);
                }
                else if(targetApi === "testApi") {
                    return TestApi.search(query);
                }
            }
        };
    }]);

}());
