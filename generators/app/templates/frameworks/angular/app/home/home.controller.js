(function () {
    "use strict";

    angular
        .module("app.module")
        .controller("HomeController", HomeController);

    HomeController.inject = [];

    function HomeController() {
        var vm = this;
    }
});