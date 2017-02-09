(function() {
    var directives = angular.module('app.common.directives', []);

    directives.directive("myHeader", function($app, $state) {
        return {
            restrict: "E",
            scope: {},
            controller: function($scope, AuthService) {
                $scope.userIsAuth = AuthService.userIsAuthenticated() ? true : false;
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
                type: "@",
                size: "@?"
            },
            controller: function($scope) {
                $scope.size = $scope.size || '';
            },
            template: "<i class='fa fa-{{type}} fa-{{size}}'></i>"
        };
    });

    directives.directive("formatDate", function() {
        return {
            restrict: "E",
            scope: {
                date: "@",
                format: "@?"
            },
            controller: function($scope) {
                if ($scope.format) {

                }
                $scope.date = new Date($scope.date);
            },
            template: "...<span> {{timestamp | date: 'yyyy-MM-dd'}} </span>"
        };
    });

    directives.directive("itemSelector", function() {
        return {
            restrict: "E",
            replace: true,
            scope: {
                ngClass: "@?class",
                selectedItem: "=ngModel",
                items: "=items",
                disabled: "=?",
                onChange: "&",
                placeholder: "@?"
            },
            contoller: function($scope) {
                $scope.$watch("selectedItem", function(newValue, oldValue) {
                    if (newValue !== null && newValue !== undefined) {
                        $scope.onChange({
                            item: newValue
                        });
                    }
                }, true);
                $scope.placeholder = $scope.placeholder || "Choose...";
            },
            templateUrl: "common/templates/item-selector.htm"
        }
    });

    directives.directive("autoCompletion", function(Trie, GoogleBooksApi, SearchService) {
        return {
            restrict: "E",
            replace: true,
            transclude: true,
            scope: {
                targetApi: "@",
                placeholder: "@?"
            },
            controller: function($scope) {
                // console.log("disabled", $scope.isDisabled);
                // console.log("targetApi", $scope.targetApi);

                // In-memory suffix trie instance
                var trie = new Trie();

                // Define default keyboard key controls
                const DOWN = 40;
                const UP = 38;
                const ENTER = 13;

                var init = function() {
                    $scope.keyboardKeyControls = {
                        index: -1,
                        suggestion: null
                    };
                    $scope.suggestions = [];
                    $scope.placeholder = $scope.placeholder || "Choose..";
                };

                var clearSuggestions = function() {
                    $scope.suggestions = [];
                };

                var restoreKeyboardKeyControls = function() {
                    $scope.keyboardKeyControls.index = -1;
                    $scope.keyboardKeyControls.suggestion = null;
                };

                // TODO add delay....
                $scope.query = function($query) {
                    //console.log("query for", $query);

                    if ($query === "") {
                        clearSuggestions();
                        restoreKeyboardKeyControls();
                        return;
                    }

                    // STEP 1. Fetch results from API (Client)
                    SearchService.search($query, $scope.targetApi).then(function(results) {

                        // STEP 2. Create trie from results (Server)
                        results.forEach(function(item) {
                            trie.addNode(item.toLowerCase());
                        });

                        // STEP 3. Find suggestions from the trie (Client)
                        var suggestionsFromTrie = trie.search($query.toLowerCase());

                        $scope.suggestions = suggestionsFromTrie;
                    });
                };

                $scope.onKeyPressed = function($event) {

                    var key = $event.keyCode;

                    // Case 1. Disable event when are no suggestions to select
                    if (!$scope.suggestions.length) {
                        restoreKeyboardKeyControls();
                        return;
                    }

                    // Case 2. when pointer has reach the last item, disable the event (there are no more suggestions to select)
                    if (key === DOWN && $scope.keyboardKeyControls.index === $scope.suggestions.length - 1) {
                        return;
                    }

                    // Case 3. When pointer has reach the first item, disable the event (there are no more suggestions to select)
                    if (key === UP && $scope.keyboardKeyControls.index === 0) {
                        return;
                    }

                    // Case 4. There are still suggestions to select
                    if (key === DOWN) { // down
                        $scope.keyboardKeyControls.index++;
                    } else if (key === UP) { // up
                        $scope.keyboardKeyControls.index--;
                    }

                    // Case 5. Enter key was pressed to select current item
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
