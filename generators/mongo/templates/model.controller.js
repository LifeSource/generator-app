module.exports = function () {

    var <%= modelClassName %> = require("../../models/<%= modelName %>/<%= modelName %>.model");

    var controller = {
        use: use,
        get: get,
        post: post,
        patch: patch,
        delete: remove,
        query: query
    };

    return controller;

    function use(req, res, next) {
        <%= modelClassName %>.find(req.params.id, function (err, <%= modelName %>) {
            if (err) {
                req.status(500).send(err);
            } else if (<%= modelName %>) {
                req.<%= modelName %> = <%= modelName %>;
                next();
            } else {
                res.status(404).send("<%= modelClassName %> not found!");
            }
        });
    }

    function get(req, res) {
        res.json(req.<%= modelName %>); 
    }

    function post(req, res) {
        var <%= modelName %> = new <%= modelClassName %>(req.body);

        <%= modelName %>.save(function (err, <%= modelName %>) {
            (err) ? res.status(500).send(err) : res.status(201).send(<%= modelName %>);
        });
    }

    function patch(req, res) {

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

    function remove(req, res) {
        req.<%= modelName %>.delete(function (err, <%= modelName %>) {
            (err) ? res.status(500).send(err) : res.status(204).send("<%= modelClassName %> deleted successfully.");
        });
    }

    function query(req, res) {
        <%= modelClassName %>.find().exec(function (err, <%= modelName %>s) {
            (err) ? res.status(500).send(err) : res.json(<%= modelName %>s);
        });
    }

};
