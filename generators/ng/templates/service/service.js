(function () {
    "use strict";

    angular
        .module("<%= serviceName %>.module")
        .factory("<%= serviceName %>Service", <%= serviceName%>Service);

    <%= serviceName %>Service.inject = ["$http"];

    function <%= serviceName %>Service($http) {

        var apiUrl = "/api/<%= serviceName %>s/";

        var service = {
            get: get,
            post: post,
            update: update,
            remove: remove,
            query: query
        };

        return service;

        function success(response) {
            return response.data;
        }

        function fail(reason) {
            return reason;
        }

        function query() {
           
            return $http.get(apiUrl)
                .then(success)
                .catch(fail);
        }

        function get(id) {
           return $http.get(apiUrl + id)
                .then(success)
                .catch(fail);
        }

        function post(data) {
           return $http.post(apiUrl, data)
                .then(success)
                .catch(fail);
        }

        function update(data) {
           return $http.patch(apiUrl + data._id, data)
                .then(success)
                .catch(fail);
        }

        function remove(id) {
           return $http.delete(apiUrl + id) 
                .then(success)
                .catch(fail);
        }
    }

})();
