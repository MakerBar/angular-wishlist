'use strict';

function WishlistCtrl($scope) {
    $scope.items = [];
    $scope.addItem = function() {
        $scope.items.push({val: ""});
    };
}

var wishlist = angular.module('wishlist', ['ngRoute']).
config(['$routeProvider', function($routeProvider) {
    $routeProvider.otherwise({
        templateUrl: "wishlist.html",
        controller: WishlistCtrl
    });
}]);
