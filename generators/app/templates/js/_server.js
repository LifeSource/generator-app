var express = require("express"),
    mongoose = require("mongoose"),
    bodyParser = require("body-parser");

var config = require("../../config")();

var path = {
    root: "./",
    build: "./build/",
    buildIndex: "./build/index.html",
    client: "./src/client/",
    index: "./src/client/index.html"
};

var port = process.env.PORT || 8000,
    environment = process.env.NODE_ENV || "dev";

var app = express();

// database setup
// mongoose.connect("mongodb://localhost/<appName>")

// middleware setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// api goes here.

// static files
switch (environment) {
    case "production":
        app.use(express.static(path.build));
        app.use("/*", express.static(path.buildIndex));
        break;
    default:
        app.use(express.static(path.client));
        app.use(express.static(path.root));
        app.use("/*", express.static(path.index));
        break;
}

app.listen(port, function () {
    console.log("Server started, listening on port: " + port);
});
