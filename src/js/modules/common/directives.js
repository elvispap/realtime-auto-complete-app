(function () {
    var directives = angular.module('app.common.directives', []);

    directives.directive("myHeader", function ($app, $state) {
        return {
            restrict: "E",
            scope: {},
            controller: function ($scope) {},
            templateUrl: "common/templates/header.htm"
        };
    });

    directives.directive("icon", function () {
        return {
            restrict: "E",
            scope: {
                type: "@",
                size: "@?"
            },
            controller: function ($scope) {
                $scope.size = $scope.size || '';
            },
            template: "<i class='fa fa-{{type}} fa-{{size}}'></i>"
        };
    });

    directives.directive("formatDate", function () {
        return {
            restrict: "E",
            scope: {
                date: "@",
                format: "@?"
            },
            controller: function ($scope) {
                if ($scope.format) {

                }
                $scope.date = new Date($scope.date);
            },
            template: "...<span> {{timestamp | date: 'yyyy-MM-dd'}} </span>"
        };
    });

    directives.directive("tooltip", function ($tooltip) {
        return {
            scope: {
                text: '@tooltip',
                options: '=?tooltipOptions',
            },
            link: function (scope, elem, attrs) {
                var options = _.merge({
                    animation: 'am-fade',
                    placement: 'top',
                    trigger: 'hover',
                    title: scope.text,
                    html: scope.htmlText,
                    delay: 0,
                }, scope.options);
                $tooltip(elem, options);
            }
        };
    });

    directives.directive("itemSelector", function () {
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
            contoller: function ($scope) {
                $scope.$watch("selectedItem", function (newValue, oldValue) {
                    if (newValue !== null && newValue !== undefined) {
                        $scope.onChange({item: newValue});
                    }
                }, true);
                $scope.placeholder = $scope.placeholder || "Choose..";
            },
            templateUrl: "common/templates/item-selector.htm"
        }
    });

    directives.directive("autoCompletion", function (Trie) {
        return {
            restrict: "E",
            replace: true,
            scope: {
                placeholder: "@?"
            },
            controller: function ($scope) {

                var trie = new Trie();

                var items = [];

                const DOWN = 40;
                const UP = 38;
                const ENTER = 13;

                var init = function () {

                    items = ["elv", "elvi", "elvis", "elvis is the best", "java software", "java dev", "java developer", "elvis is the best of the best"];

                    $scope.currentItemFromIndex;
                    $scope.keyUpDownValue = -1;
                    $scope.items = [];
                    $scope.placeholder = $scope.placeholder || "Choose..";
                };

                var addItem = function (item) {
                    $scope.items.push(item);
                };

                var itemExistInItems = function (item, items) {
                    var exist = false;
                    var itemsLength = items.length;
                    for (var i = 0; i < itemsLength; i++) {
                        if (items[i] === item) {
                            exist = true;
                            break;
                        }
                    }
                    return exist;
                }

                var clearItems = function () {
                    $scope.items = [];
                };

                var clearIndexData = function () {
                    // restore default values
                    $scope.keyUpDownValue = -1;
                    $scope.currentItemFromIndex = null;
                };



                $scope.query = function (q) {
                    //console.log("query for", q);

                    if (q === "") {
                        clearItems();
                        clearIndexData();
                        return;
                    }

                    // STEP 1. Fetch results from API (Client)

                    // STEP 2. Create trie from results (Server)
                    items.forEach(function (value) {
                        trie.addNode(value);
                    });

                    // STEP 3. Find suggestions from the trie (Client)
                    var results = trie.autoComplete(q.toLowerCase());
                    console.log("got results", results);

                    $scope.items = results;

                };

                $scope.onKeyPressed = function ($event) {

                    var key = $event.keyCode;

                    // Case 1. Disable event when are no items to select
                    if (!$scope.items.length) {
                        clearIndexData();
                        return;
                    }

                    // Case 2. when pointer has reach the last item, disable the event (there are no more items to select)
                    if (key === DOWN && $scope.keyUpDownValue === $scope.items.length - 1) {
                        return;
                    }

                    // Case 3. When pointer has reach the first item, disable the event (there are no more items to select)
                    if (key === UP && $scope.keyUpDownValue === 0) {
                        return;
                    }

                    // Case 4. There are still items to select
                    if (key === DOWN) {    // down
                        $scope.keyUpDownValue++;
                    } else if (key === UP) {   // up
                        $scope.keyUpDownValue--;
                    }

                    // Case 5. Enter key was pressed to select current item

                    if (key === ENTER && $scope.currentItemFromIndex) {
                        $scope.selectItem($scope.currentItemFromIndex);
                    }


                    // Finally, set current active item
                    if ($scope.keyUpDownValue !== -1) {
                        var itemFromIndex = $scope.items[$scope.keyUpDownValue];
                        $scope.currentItemFromIndex = itemFromIndex;
                    }

                };

                $scope.selectItem = function (item) {
                    $scope.$query = item;
                    clearItems();
                };

                $scope.getListItemClass = function (index) {
                    if (typeof $scope.currentItemFromIndex !== undefined && $scope.items[index] === $scope.currentItemFromIndex) {
                        return 'active';
                    }
                    return 'inactive';
                };

                init();
            },
            templateUrl: "common/templates/auto-completion.htm"
        }
    });

    directives.directive("myFooter", function () {
        return {
            restrict: "E",
            scope: {},
            controller: function ($scope) {
                $scope.currentDate = new Date();
            },
            templateUrl: "common/templates/footer.htm"
        };
    });

}());
