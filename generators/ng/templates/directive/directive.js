(function () {
    "use strict";
    
    angular
        .module("<%= moduleName %>.module")
        .directive("<%= directiveName %>", <%= directiveName %>);

    <%= directiveName %>.$inject = [];

    function <%= directiveName %>() {

        var directive = {
            scope: false, 
            restrict: "AE",
            controller: controller
        };

        return directive;

        function controller() {
            
        }
    }
})();
