(function() {
    var services = angular.module('app.common.services');

    services.factory("GoogleMapsApi", ['$http', '$q', '$googleApiConfig', function($http, $q, $googleApiConfig) {
        return {
            search: function(query) {
                var deferred = $q.defer();
                $http({
                    method: "get",
                    url: "https://maps.googleapis.com/maps/api/place/autocomplete/json",
                    params: {
                        input: query,
                        maxResults: $googleApiConfig.api.maxResults,
                        types: 'geocode',
                        key: $googleApiConfig.api.keys.maps
                    }
                }).then(function(response) {

                    var isValid = function(item) {
                        return (item && typeof item !== "undefined");
                    };

                    // Check if the response items are valid
                    var responseItems = response.data.predictions;
                    if(isValid(responseItems)) {
                        var results = responseItems.map(function(item) {
                            if(isValid(item.description)) {
                                return item.description;
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
