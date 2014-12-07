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
listMod.service('Lists', ['List', '$window', function(List, $window) {
    var lists = [];
    var saved = angular.fromJson(sessionStorage.getItem("wishlists"));
    if (saved) {
        saved.forEach(function(list_data) {
            var l = new List(list_data.name);
            list_data.items.forEach(function(ldi) {
                l.addItem(ldi.name);
            });
            lists.push(l);
        });
    }
    this.getLists = function() {
        return lists;
    };
    this.addList = function(name) {
        if (!name) {
            throw new Error("List needs a name");
        }
        lists.push(new List(name));
    };
    $window.addEventListener("beforeunload", function() {
        sessionStorage.setItem("wishlists", angular.toJson(lists));
    });
}]);
listMod.controller('WishlistCtrl', ['$scope', 'Lists', function($scope, Lists) {
    $scope.lists = Lists.getLists();
    $scope.addNewList = function() {
        Lists.addList($scope.newListName);
        $scope.newListName = "";
    };
}]);

var wishlist = angular.module('wishlist', ['ngRoute', 'listMod']).
config(['$routeProvider', function($routeProvider) {
    $routeProvider.otherwise({
        templateUrl: "wishlist.html",
        controller: 'WishlistCtrl'
    });
}]);
