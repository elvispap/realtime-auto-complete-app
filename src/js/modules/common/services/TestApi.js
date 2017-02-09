(function() {
    var services = angular.module('app.common.services');

    services.factory("TestApi", ['$http', '$q', function($http, $q) {
        return {
            search: function(query) {
                var deferred = $q.defer();
                var items = ["java", "java 3", "java 4", "java 5",
                        "is java better or worse than groovy ?", "java is popular",
                         "java is popular in Europe", "java is difficult"];
                deferred.resolve(items);
                return deferred.promise;
            }
        };
    }]);

}());
