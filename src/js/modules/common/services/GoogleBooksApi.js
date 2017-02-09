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
                        key: $googleApiConfig.api.key
                    }
                }).then(function(response) {
                    var itemIsValid = function(item) {
                        return (item && typeof item !== "undefined");
                    };
                    var responseItems = response.data.items.map(function(item) {
                        if(itemIsValid(item.volumeInfo.title)) {
                            return item.volumeInfo.title;
                        }
                    });
                    deferred.resolve(responseItems);
                });

                return deferred.promise;
            }
        };
    }]);

}());
