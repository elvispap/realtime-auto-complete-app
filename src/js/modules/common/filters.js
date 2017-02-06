(function(){
    var filters = angular.module('app.common.filters', []);

    filters.filter("formDate", function() {
        return function(input){
            if(input == null){
                 return "";
             }
            var _date = $filter('date')(new Date(input), 'dd/MM/yyyy');
            return _date.toUpperCase();
        };
    });
})();
