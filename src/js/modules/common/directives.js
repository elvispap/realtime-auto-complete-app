(function() {
    var directives = angular.module('app.common.directives', []);

    directives.directive("autoCompletion", function($timeout, Trie, SearchService) {
        return {
            restrict: "E",
            replace: true,
            transclude: true,
            scope: {
                targetApi: "@",
                placeholder: "@?"
            },
            controller: function($scope) {

                // The in-memory suffix trie instance used by our autocomplete algorithm
                var trie;

                // Keyboard arrow key controls
                const DOWN = 40;
                const UP = 38;
                const ENTER = 13;

                var init = function() {
                    // The current index and suggestion of the displayed suggestsions when user users
                    // the keyboard arrow controls to navigate though them
                    $scope.keyboardKeyControls = {
                        index: -1,
                        suggestion: null
                    };

                    // The current found suggestions displayed in the UI
                    $scope.suggestions = [];

                    trie = new Trie();
                };

                var clearSuggestions = function() {
                    $scope.suggestions = [];
                    $scope.queryResponseTime = null;
                };

                var restoreKeyboardKeyControls = function() {
                    $scope.keyboardKeyControls.index = -1;
                    $scope.keyboardKeyControls.suggestion = null;
                };

                var calculateResponseTime = function(endTime, startTime) {
                    var unroundedTime = (endTime - startTime) / 1000;
                    var roundedTime = Math.round(unroundedTime * 100) / 100;
                    return roundedTime;
                };

                // Timeout promise variable to prevent multiple requsets for each character change in the autocomplete input
                // For example when user types VERY QUICKLT the word "machine" we want to fire only request with the value
                // "machine" and not 5 rquest for each of the subtrings: "m", "mac", "mach", "machi", "machin"
                var queryPromise;

                $scope.onQuery = function($query) {

                    $timeout.cancel(queryPromise);

                    if ($query === "") {
                        clearSuggestions();
                        restoreKeyboardKeyControls();
                        return;
                    }

                    // Get query start time
                    var startTime = performance.now();

                    queryPromise = $timeout(function() {

                        // STEP 1. Fetch results from Search service
                        SearchService.search($query, $scope.targetApi).then(function(results) {

                            // STEP 2. Create/update trie from results
                            results.forEach(function(item) {
                                trie.addPrefix(item.toLowerCase());
                            });

                            // STEP 3. Get suggestions from the trie
                            var foundSuggestions = trie.search($query.toLowerCase());

                            // Get query end time
                            var endTime = performance.now();

                            console.log("query: " + $query + " | found suggestions: ", foundSuggestions);

                            $scope.queryResponseTime = calculateResponseTime(endTime, startTime);
                            $scope.suggestions = foundSuggestions;
                        });
                    }, 500);
                };

                $scope.onKeyboardBtnPressed = function($event) {
                    var key = $event.keyCode;

                    // Case 1. Disable event when are no suggestions to select
                    if (!$scope.suggestions.length) {
                        restoreKeyboardKeyControls();
                        return;
                    }

                    // Case 2. When pointer has reached the last suggestion from the list, disable the event (there are no suggestions to select)
                    if (key === DOWN && $scope.keyboardKeyControls.index === $scope.suggestions.length - 1) {
                        return;
                    }

                    // Case 3. When pointer has reached the first suggestion, disable the event (there are no suggestions to select)
                    if (key === UP && $scope.keyboardKeyControls.index === 0) {
                        return;
                    }

                    // Case 4. There are still suggestions to navigate
                    if (key === DOWN) { // down
                        $scope.keyboardKeyControls.index++;
                    } else if (key === UP) { // up
                        $scope.keyboardKeyControls.index--;
                    }

                    // Case 5. 'Enter' key was pressed to select current item
                    if (key === ENTER && $scope.keyboardKeyControls.suggestion) {
                        $scope.selectSuggestion($scope.keyboardKeyControls.suggestion);
                    }

                    // Finally, set current active suggestion
                    if ($scope.keyboardKeyControls.index !== -1) {
                        $scope.keyboardKeyControls.suggestion = $scope.suggestions[$scope.keyboardKeyControls.index];
                    }
                };

                $scope.selectSuggestion = function(suggestion) {
                    $scope.$query = suggestion;
                    clearSuggestions();
                };

                $scope.getSuggestionItemClass = function(index) {
                    var suggestionIsActive = function() {
                        return typeof $scope.keyboardKeyControls.suggestion !== undefined && $scope.suggestions[index] === $scope.keyboardKeyControls.suggestion;
                    };
                    return suggestionIsActive() ? 'active' : 'inactive';
                };

                init();
            },
            templateUrl: "common/templates/auto-completion.htm"
        }
    });

    directives.directive("myHeader", function($state) {
        return {
            restrict: "E",
            scope: {},
            controller: function($scope, AuthService) {
                $scope.userIsAuth = AuthService.userIsAuthenticated();
                $scope.$on("userLogOut", function(event) {
                    $scope.userIsAuth = false;
                });
                $scope.$on("userLogin", function(event) {
                    $scope.userIsAuth = true;
                });
            },
            templateUrl: "common/templates/header.htm"
        };
    });

    directives.directive("icon", function() {
        return {
            restrict: "E",
            scope: {
                class: "@",
                size: "@?"
            },
            controller: function($scope) {
                $scope.size = $scope.size || '';
            },
            template: "<i class='fa fa-{{class}} fa-{{size}}'></i>"
        };
    });

    directives.directive("myFooter", function() {
        return {
            restrict: "E",
            scope: {},
            controller: function($scope) {
                $scope.currentDate = new Date();
            },
            templateUrl: "common/templates/footer.htm"
        };
    });

}());
