var express = require("express"),
    bodyParser = require("body-parser");

var config = require("../../config")();

var app = express();

// database setup
// require("./models/db");

// middleware setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// api goes here.

// static files
switch (config.env) {
    case "production":
        app.use(express.static(config.build));
        app.use("/*", express.static(config.buildIndex));
        break;
    default:
        app.use(express.static(config.client));
        app.use(express.static(config.root));
        app.use("/*", express.static(config.index));
        break;
}

app.listen(config.port, function () {
    console.log("Express server started, listening on port: ", config.port);
});
