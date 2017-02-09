(function() {
    var services = angular.module('app.common.services');

    services.factory("TestApi", ['$q', function($q) {
        return {
            search: function(query) {
                var deferred = $q.defer();
                var items = ["java", "java 7", "java 8", "java 8 is good ?",
                            "java or groovy ?", "groovy", "groovy ?", "java 7 vs java 8",
                            "java vs groovy", "java is for sure better ?", "java and groovy"];
                deferred.resolve(items);
                return deferred.promise;
            }
        };
    }]);

}());
