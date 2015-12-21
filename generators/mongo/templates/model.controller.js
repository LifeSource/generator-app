module.exports = function () {

    var <%= modelName %> = require("../models/<%= modelName %>/<%= modelName %>.model");

    var controller = {
        use: use,
        get: get,
        post: post,
        update: update,
        delete: "delete",
        query: query
    };

    return controller;

    function use(req, res, next) {
        <%= modelName %>.find(req.params.<%= modelName %>).exec(function (err, <%= modelName %>) {
            if (err) {
                req.status(500).send(err);
            } else if (<%= modelName %>) {
                res.<%= modelName %> = <%= modelName %>;
                next();
            } else {
                res.status(404).send("<%= modelName %> not found!");
            }
        });
    }

    function get(req, res) {
        res.json(req.<%= modelName %>); 
    }

    function post(req, res) {
        var <%= modelName %> = new <%= modelName %>(req.body);

        <%= modelName %>.save(function (err, <%= modelName %>) {
            (err) ? res.status(500).send(err) : res.status(201).send(<%= modelName %>);
        });
    }

    function update(req, res) {

        if (req.params.id) {
            delete req.params.id;
        }

        for (var prop in req.<%= modelName%>) {
            req.<%= modelName%>[prop] = req.body[prop];
        }

        req.<%= modelName %>.save(function (err, <%= modelName %>) {
            (err) ? res.status(500).send(err) : res.status(201).send(<%= modelName %>);
        });
    }

    function delete(req, res) {
        <%= modelName %>.delete(function (err, <%= modelName %>) {
            (err) ? res.status(500).send(err) : res.status(204).send("<%= modelName %> deleted successfully.");
        });
    }

    function query(req, res) {
        <%= modelName %>.find().exec(function (err, <%= modelName %>s) {
            (err) ? res.status(500).send(err) : res.json(<%= modelName %>s);
        });
    }

};
