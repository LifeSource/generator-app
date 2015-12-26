(function () {
    "use strict";

    angular
        .module("<%= moduleName %>.module")
        .controller("<%= controllerName %>Controller", <%= controllerName  %>Controller);

    <%= controllerName %>Controller.$inject= [];

    function <%= controllerName %>Controller() {
        var vm = this;
        
    }

})();
