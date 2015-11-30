var generators  = require("yeoman-generator"),
    _ = require("lodash"),
    util = require('util'),
    path = require('path'),
    yosay = require('yosay'),
    chalk = require('chalk'),
    mkdirp = require("mkdirp"),
    config = require("../../config")();

module.exports = generators.Base.extend({

    constructor: function () {

        generators.Base.apply(this, arguments);

        var options = {
            au: { desc: "Uses the Aurelia development setup.", type: String},
            ng: { desc: "Uses the Angular development setup.", type: String}
        };

        this.argument('appName', { type: String, required: false });
        this.appName = _.camelCase(this.appName);

        this.option("aurelia", options.au);
        this.option("angular", options.ng);
    },

    prompting: function () {

        if (this.appName) {
            return;
        }

        var done = this.async();

        var prompts = {
            type: "input",
            name: "appName",
            message: "Please enter your app name:",
            default: this.appName || path.basename(process.cwd())
        };

        this.prompt(prompts, function (answers) {
            this.log("answers.appName: ", answers.appName);
            this.appName = answers.appName;
            this.appName = this.appName || path.basename(process.cwd());
            this.log("this.appName: ", this.appName);
            done();
        }.bind(this));
    },

    scaffordFolders: function () {

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

        gn.log("Creating application folders and template files:\n");

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

    packageFiles: function () {

        var context = {
            appName: this.appName
        };

        var gn = this;

        var templatesToCopy = [
            { name: "json/_package.json", path: "./package.json" },
            { name: "json/_bower.json", path: "./bower.json" },
            { name: "settings/_.babelrc", path: "./.babelrc" },
            { name: "settings/_.bowerrc", path: "./.bowerrc" },
            { name: "settings/_.jshintrc", path: "./.jshintrc" },
            { name: "settings/_.editorconfig", path: "./.editorconfig" },
            { name: "settings/_.gitignore", path: "./.gitignore" },
            { name: "settings/_README.md", path: "./README.md" },
            { name: "js/_gulpfile.js", path: "./gulpfile.js"},
            { name: "js/_karmaconf.js", path: "./karmaconf.js"},
            { name: "js/_server.js", path: "./src/server/server.js"},
            { name: "js/_app.js", path: "./src/client/app/app.js"},
            { name: "styles/_grid.styl", path: "./src/client/styles/grid.styl"},
            { name: "styles/_layout.styl", path: "./src/client/styles/layout.styl"},
            { name: "styles/_site.styl", path: "./src/client/styles/site.styl"}
        ];

        if (gn.options.aurelia) {
            templatesToCopy.push(
                { name: "js/_aureliaConfig.js", path: "./config.js"},
                { name: "js/_main.js", path: "./src/client/main.js"},
                { name: "js/_aureliaApp.js", path: "./src/client/app/app.js"},
                { name: "js/_home.js", path: "./src/client/app/home/home.js"},
                { name: "html/_app.html", path: "./src/client/app/app.html"},
                { name: "html/_home.html", path: "./src/client/app/home/home.html"},
                { name: "html/_aureliaIndex.html", path: "./src/client/index.html"}
            );
        } else {
            templatesToCopy.push(
                { name: "js/_config.js", path: "./config.js"},
                { name: "html/_index.html", path: "./src/client/index.html"}
            );
        }

        templatesToCopy.forEach(function (element, index, array) {
            gn.fs.copyTpl(gn.templatePath(element.name), gn.destinationPath(element.path), { appName: gn.appName });
        });
    },

    install: function () {
        this.installDependencies();
    },

    end: function () {
        this.log("\n----->>> Mission Accomplished! <<<-----");
        this.log("\n\tPlease run 'gulp serve-dev' to start the development environment or 'gulp' for gulp task listings.");
    }

});
