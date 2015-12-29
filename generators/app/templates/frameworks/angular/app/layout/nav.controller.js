(function () {
    "use strict";
    
    angular
        .module("app.core")
        .controller("NavController", NavController);

    NavController.$inject = [];

    function NavController() {
        var vm = this;

        vm.navs = [
            { name: "Home", state: "home", icon: "" },
            { name: "About", state: "about", icon: "" },
            { name: "Contact", state: "contact", icon: "" },
        ];
    }
})();
