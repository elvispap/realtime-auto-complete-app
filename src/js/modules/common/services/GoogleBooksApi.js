(function() {
    var services = angular.module('app.common.services');

    services.factory("GoogleBooksApi", ['$http', '$q', '$googleApiConfig', function($http, $q, $googleApiConfig) {
        return {
            search: function(query) {
                var deferred = $q.defer();
                $http({
                    method: "get",
                    url: "https://www.googleapis.com/books/v1/volumes",
                    params: {
                        q: query,
                        maxResults: $googleApiConfig.api.maxResults,
                        key: $googleApiConfig.api.keys.books
                    }
                }).then(function(response) {

                    var isValid = function(item) {
                        return (item && typeof item !== "undefined");
                    };

                    // Check if the response items are valid
                    var responseItems = response.data.items;
                    if(responseItems) {
                        var results = responseItems.map(function(item) {
                            if(isValid(item.volumeInfo.title)) {
                                return item.volumeInfo.title;
                            }
                        });
                        deferred.resolve(results);
                    }
                    else {
                        // No results found
                        deferred.resolve([]);
                    }
                });
                return deferred.promise;
            }
        };
    }]);
}());
