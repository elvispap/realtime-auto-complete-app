(function() {
    var services = angular.module('app.common.services');

    services.factory('AuthService', function() {

        return {
            login: function(userame, password) {
                if (userame === "test" && password === "test") {
                    localStorage.setItem("auth", true);
                    return true;
                }
                return false;
            },
            signup: function(email, password) {
                // TODO
            },
            resetEmail: function(email) {
                // TODO
            },
            logout: function() {
                localStorage.removeItem("auth");
            },
            userIsAuthenticated: function() {
                return localStorage.getItem("auth") !== null;
            }
        };
    });
}());
