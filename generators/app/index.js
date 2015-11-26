var generators  = require("yeoman-generator"),
    mkdirp = require("mkdirp"),
    config = require("../../config")();

module.exports = generators.Base.extend({

    constructor: function () {
        generators.Base.apply(this, arguments);
    },

    initializing: function () {
        this.log("initializing");
    },

    prompting: function () {
        var done = this.async();
        this.prompt({ type: "input", name: "appname", message: "Please enter your app name:", default: this.appname },
            function (answers) {
                this.log(answers);
                done();
            }.bind(this));
    },

    configuring: function () {

        var gn = this;
        var directoriesToMake = [
            "./dist",
            "./tests",
            "./src/client",
            "./src/client/css",
            "./src/client/fonts",
            "./src/client/images",
            "./src/client/styles",
            "./src/server",
            "./src/server/apis",
            "./src/server/controllers",
            "./src/server/models",
            "./src/server/routes",
        ];

        directoriesToMake.forEach(function (element, index, array) {

            mkdirp(element, function (err) {
                if (err) {
                    gn.log(err);
                } else {
                    gn.log(element + " folder created.");
                }
            });
         });
    },

    default: function () {
        this.log("default");
    },

    writing: function () {

        var gn = this;

        var templatesToCopy = [
            { name: "json/_package.json", path: "./package.json" },
            { name: "json/_bower.json", path: "./bower.json" },
            { name: "settings/_.bowerrc", path: "./.bowerrc" },
            { name: "settings/_.jshintrc", path: "./.jshintrc" },
            { name: "settings/_.editorconfig", path: "./.editorconfig" },
            { name: "js/_config.js", path: "./config.js"},
            { name: "js/_gulpfile.js", path: "./gulpfile.js"},
            { name: "js/_server.js", path: "./src/server/server.js"},
            { name: "js/_app.js", path: "./src/client/app/app.js"},
            { name: "html/_index.html", path: "./src/client/index.html"}
        ];

        templatesToCopy.forEach(function (element, index, array) {
            gn.fs.copyTpl(gn.templatePath(element.name), gn.destinationPath(element.path))
        });
    },

    conflicts: function () {
        this.log("conflicts");
    },

    install: function () {
        var gn = this;
        this.log("Installing packages:\n");

        this.npmInstall("", function () {
            gn.log("\nFinished installing packages");
        });
    },

    end: function () {
        this.log("end");
    }

});
