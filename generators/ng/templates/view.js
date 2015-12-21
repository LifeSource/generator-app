(function () {
    "use strict";

    angular
        .module("<%= appName %>")
        .controller("<%= controllerName %>Controller", <%= controllerName  %>Controller);

    <%= controllerName %>Controller.$inject= [];

    function <%= controllerName %>Controller() {
        var vm = this;
        
    }

})();
