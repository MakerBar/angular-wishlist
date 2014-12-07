'use strict';

var test = angular.module('wishlistTest', ['ngRoute', 'listMod']).
config(['$routeProvider', function($routeProvider) {
    $routeProvider.otherwise({
        template: "",
        controller: ['List', function(List) {
            mocha.setup('bdd');
            var expect = chai.expect;

            describe("List", function() {
                describe("constructor", function() {
                    it("should have items", function() {
                        var l = new List();
                        expect(l.items.length).to.equal(0);
                    });
                });

                describe("adding items", function() {
                    it("should add blank items to the list", function() {
                        var l = new List();
                        l.addItem();
                        expect(l.items.length).to.equal(1);
                        expect(l.items[0].name).to.equal("");
                    });

                    it("should add named items to the list", function() {
                        var l = new List();
                        l.addItem();
                        l.addItem("asdf");
                        expect(l.items.length).to.equal(2);
                        expect(l.items[1].name).to.equal("asdf");
                    });
                });

                describe("#example of failed message", function() {
                    it("can't go out of bounds", function() {
                        var l = new List();
                        expect(l.items.length()).to.equal(3);
                    });
                });
            });
            mocha.run();
        }]
    });
}]);
