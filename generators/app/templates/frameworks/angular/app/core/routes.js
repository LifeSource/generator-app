(function() {
    'use strict';

    angular
        .module("app.core")
        .config(routes);

    routes.$inject = [ "$stateProvider", "$urlRouterProvider", "$locationProvider"];

    function routes($stateProvider, $urlRouterProvider, $locationProvider) {
        
        $stateProvider
            .state("home", {
                url: "/"
            });

        $urlRouterProvider.otherwise("/");
    }

}());
