'use strict';

var listMod = angular.module('listMod', []);
listMod.factory('List', [function() {
    var List = function(name) {
        this.name = name;
        this.items = [];
    };
    List.prototype.addItem = function(val) {
        if (!val) {
            val = "";
        }
        this.items.push({name: val});
    };
    return List;
}]);
listMod.service('Lists', ['List', function(List) {
    var lists = [];
    this.getLists = function() {
        return lists;
    };
    this.addList = function(name) {
        if (!name) {
            throw new Error("List needs a name");
        }
        lists.push(new List(name));
    };
}]);
listMod.controller('WishlistCtrl', ['$scope', 'Lists', function($scope, Lists) {
    Lists.addList("my-list");
    Lists.addList("your-list");
    $scope.lists = Lists.getLists();
}]);

var wishlist = angular.module('wishlist', ['ngRoute', 'listMod']).
config(['$routeProvider', function($routeProvider) {
    $routeProvider.otherwise({
        templateUrl: "wishlist.html",
        controller: 'WishlistCtrl'
    });
}]);
