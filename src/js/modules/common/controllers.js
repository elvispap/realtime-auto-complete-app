(function () {
    var controllers = angular.module('app.common.controllers', []);


    controllers.controller("HomeController", function ($scope, $api, $state) {

        $api.one("accounts").getList().then(function (accounts) {
            $scope.accounts = accounts;
        });

        $scope.goToAccount = function (accountId) {
            $state.go('app.accounts.show', {accountId: accountId});
        }
    });
})();
