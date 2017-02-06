(function() {
    var directives = angular.module('app.common.directives', []);

    directives.directive("myHeader", function($app, $state) {
        return {
            restrict: "E",
            scope: {},
            controller: function($scope) {},
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

    directives.directive("tooltip", function($tooltip) {
        return {
            scope: {
                text: '@tooltip',
                options: '=?tooltipOptions',
            },
            link: function(scope, elem, attrs) {
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

    directives.directive("itemSelector", function(){
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
                $scope.$watch("selectedItem", function(newValue, oldValue){
                    if(newValue !== null && newValue !== undefined){
                        $scope.onChange({item: newValue});
                    }
                }, true);
                $scope.placeholder = $scope.placeholder || "Choose..";
            },
            templateUrl: "common/templates/item-selector.htm"
        }
    });

    directives.directive("autoCompletion", function(){
        return {
            restrict: "E",
            replace: true,
            scope: {
                placeholder: "@?"
            },
            controller: function($scope) {

                var items = [];

                const DOWN = 40;
                const UP = 38;

                var init = function() {
                    items = [
                        {id: 1, value: "groovy"},
                        {id: 2, value: "java"},
                        {id: 2, value: "java 2"},
                        {id: 2, value: "java 3"},
                        {id: 2, value: "java 4"},
                        {id: 3, value: "python"}
                    ];
                    $scope.keyUpDownValue = -1;
                    $scope.items = [];
                    $scope.placeholder = $scope.placeholder || "Choose..";
                };

                var addItem = function(item) {
                    $scope.items.push(item);
                };

                var itemExistInItems = function(item, items) {
                    var exist = false;
                    var itemsLength = items.length;
                    for(var i=0; i < itemsLength; i++) {
                        if(items[i] === item) {
                            exist = true;
                            break;
                        }
                    }
                    return exist;
                }

                var clearItems = function() {
                    $scope.items = [];
                };

                RegExp.escape = function (s) {
                    return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
                };

                $scope.query = function(q) {
                    console.log("query for", q);
                    if(q === "") {
                        clearItems();
                        return;
                    }

                    items.forEach(function(item){
                        var itemValue = item.value;

                        var testableRegExp = new RegExp(RegExp.escape(q), "i");
                        if (itemValue.match(testableRegExp) && !itemExistInItems(itemValue, $scope.items)) {
                            console.log("adding itemValue", itemValue);
                            addItem(itemValue);
                        }
                    });

                };

                $scope.onKeyDown = function($event) {

                    var key = $event.keyCode;

                    // Disable event when are no items to select
                    if(!$scope.items.length) {
                        $scope.keyUpDownValue = -1;     // restore default value
                        return;
                    }

                    // When pointer has reach the last item, disable the event (there are no more items to select)
                    if(key === DOWN && $scope.keyUpDownValue === $scope.items.length - 1) {
                        return;
                    }

                    // When pointer has reach the first item, disable the event (there are no more items to select)
                    if(key === UP && $scope.keyUpDownValue === 0) {
                        return;
                    }

                    //if(key === UP )

                    //console.log("got key", key);
                    if(key === DOWN) {    // down
                        $scope.keyUpDownValue++;
                    }
                    else if(key === UP) {   // up
                        $scope.keyUpDownValue--;
                    }
                    console.debug("return item in position", $scope.keyUpDownValue);
                };

                $scope.onKeyUp = function($event) {
                    //$scope.keyUpDownValue--;
                    console.log("onKeyUp", $scope.keyUpDownValue);
                };

                $scope.selectItem = function(item) {
                    $scope.$query = item;
                    clearItems();
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
