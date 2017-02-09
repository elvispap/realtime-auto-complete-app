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
                    var itemIsValid = function(item) {
                        return (item && typeof item !== "undefined");
                    };
                    var responseItems = response.data.predictions.map(function(item) {
                        if (itemIsValid(item.description)) {
                            return item.description;
                        }
                    });
                    deferred.resolve(responseItems);
                });

                return deferred.promise;
            }
        };
    }]);

}());
