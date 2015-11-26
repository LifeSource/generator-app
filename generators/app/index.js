var generators  = require("yeoman-generator"),
    mkdirp = require("mkdirp"),
    config = require("../../config")();

module.exports = generators.Base.extend({

    constructor: function () {
        generators.Base.apply(this, arguments);
        this.option("aurelia", {
            desc: "Uses the Aurelia development setup.",
            alias: "au",
            type: String,
            defaults: "aurelia"
        });
    },

    initializing: function () {
        // Initialization
    },

    prompting: function () {
        var done = this.async();
        this.prompt({ type: "input", name: "appname", message: "Please enter your app name:", default: this.appname },
            function (answers) {
                done();
            }.bind(this));
    },

    configuring: function () {

        var gn = this;
        var directoriesToMake = [
            "./dist",
            "./tests",
            "./src/client",
            "./src/client/app",
            "./src/client/app/core",
            "./src/client/app/home",
            "./src/client/css",
            "./src/client/fonts",
            "./src/client/images",
            "./src/client/styles",
            "./src/client/tests",
            "./src/server",
            "./src/server/apis",
            "./src/server/controllers",
            "./src/server/models",
            "./src/server/routes",
        ];

        gn.log("\nCreating application folders:\n");
        directoriesToMake.forEach(function (element, index, array) {

            mkdirp(element, function (err) {
                if (err) {
                    gn.log(err);
                } else {
                    gn.log("\t" + element + " folder created.");
                }
            });
         });
    },

    default: function () {
        // Default queue
    },

    writing: function () {

        var gn = this;

        var templatesToCopy = [
            { name: "json/_package.json", path: "./package.json" },
            { name: "json/_bower.json", path: "./bower.json" },
            { name: "settings/_.bowerrc", path: "./.bowerrc" },
            { name: "settings/_.jshintrc", path: "./.jshintrc" },
            { name: "settings/_.editorconfig", path: "./.editorconfig" },
            { name: "js/_gulpfile.js", path: "./gulpfile.js"},
            { name: "js/_karmaconf.js", path: "./karmaconf.js"},
            { name: "js/_server.js", path: "./src/server/server.js"},
            { name: "js/_app.js", path: "./src/client/app/app.js"},
            { name: "styles/_layout.styl", path: "./src/client/styles/layout.styl"},
            { name: "styles/_site.styl", path: "./src/client/styles/site.styl"}
        ];

        if (this.options.aurelia) {
            templatesToCopy.push(
                { name: "js/_aureliaConfig.js", path: "./config.js"},
                { name: "js/_main.js", path: "./src/client/main.js"},
                { name: "js/_aureliaApp.js", path: "./src/client/app/app.js"},
                { name: "js/_home.js", path: "./src/client/home/home.js"},
                { name: "html/_app.html", path: "./src/client/app/app.html"},
                { name: "html/_home.html", path: "./src/client/home/home.html"},
                { name: "html/_aureliaIndex.html", path: "./src/client/index.html"}
            );
        } else {
            templatesToCopy.push(
                { name: "js/_config.js", path: "./config.js"},
                { name: "html/_index.html", path: "./src/client/index.html"}
            );
        }

        gn.log("\nCreating template files:\n");
        templatesToCopy.forEach(function (element, index, array) {
            gn.fs.copyTpl(gn.templatePath(element.name), gn.destinationPath(element.path), { title: gn.appname });
        });
    },

    conflicts: function () {
        // Conflicts resolution
    },

    install: function () {
        var gn = this;
        this.log("Installing packages:\n");

        this.npmInstall("", function () {
            gn.log("\nFinished installing packages ... \n");
        });
    },

    end: function () {
        this.log("\n\tPlease run 'gulp serve-dev' to start the development environment or 'gulp' for gulp task listings.");
    }

});
