var express = require("express");

module.exports = function () {
    
    var <%= modelName%>Router = express.Router();

    var <%= modelName %>Controller = require("../../controllers/<%= modelName %>/<%= modelName %>.controller")();


    <%= modelName %>Router.route("/")
        .get(<%= modelName %>Controller.query)
        .post(<%= modelName %>Controller.post);

    <%= modelName %>Router.use("/:id", <%= modelName %>Controller.use);

    <%= modelName %>Router.route("/:id")
        .get(<%= modelName %>Controller.get)
        .patch(<%= modelName %>Controller.patch)
        .delete(<%= modelName %>Controller.delete);
    
    return <%= modelName %>Router;
};
