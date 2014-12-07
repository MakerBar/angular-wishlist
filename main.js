'use strict';

var listMod = angular.module('listMod', []);
listMod.factory('List', [function() {
    var List = function() {
        this.items = [];
    };
    List.prototype.addItem = function() {
        this.items.push({val: ""});
    };
    return List;
}]);

listMod.controller('WishlistCtrl', ['$scope', 'List', function($scope, List) {
    $scope.list = new List();
}]);

var wishlist = angular.module('wishlist', ['ngRoute', 'listMod']).
config(['$routeProvider', function($routeProvider) {
    $routeProvider.otherwise({
        templateUrl: "wishlist.html",
        controller: 'WishlistCtrl'
    });
}]);
