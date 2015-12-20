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
            this.appName = answers.appName;
            this.appName = this.appName || path.basename(process.cwd());
            done();
        }.bind(this));
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
            { name: "js/_server.js", path: "./src/server/server.js"},
            { name: "js/_db.js", path: "./src/server/models/db.js"},
            { name: "js/_seedData.js", path: "./src/server/models/seedData.js"},
            { name: "js/_index.js", path: "./src/test/index.js"},
            { name: "js/_index.js", path: "./src/client/app/core/index.js"},
            { name: "js/_index.js", path: "./src/server/controllers/index.js"},
            { name: "js/_index.js", path: "./src/server/routes/index.js"},
            { name: "styles/_site.styl", path: "./src/styles/site.styl"}
        ];

        if (gn.options.aurelia) {
            templatesToCopy.push(
                { name: "js/aurelia/_aureliafile.js", path: "./aurelifile.js"},
                { name: "js/aurelia/_aureliaConfig.js", path: "./config.js"},
                { name: "js/aurelia/_aureliaStartup.js", path: "./src/client/aurelia-startup.js"},
                { name: "js/aurelia/_main.js", path: "./src/client/main.js"},
                { name: "js/aurelia/_jspmConfig.js", path: "./src/client/config.js"},
                { name: "js/aurelia/_index.js", path: "./src/client/app/core/index.js"},
                { name: "js/aurelia/_dateValueConverter.js", path: "./src/client/app/core/date.js"},
                { name: "js/aurelia/_currencyValueConverter.js", path: "./src/client/app/core/currency.js"},
                { name: "js/aurelia/_navMenu.js", path: "./src/client/app/core/navMenu.js"},
                { name: "html/aurelia/_navMenu.html", path: "./src/client/app/core/navMenu.html"},
                { name: "js/aurelia/_app.js", path: "./src/client/app/app.js"},
                { name: "html/aurelia/_app.html", path: "./src/client/app/app.html"},
                { name: "js/aurelia/_home.js", path: "./src/client/app/home/home.js"},
                { name: "html/aurelia/_home.html", path: "./src/client/app/home/home.html"},
                { name: "html/aurelia/_aureliaIndex.html", path: "./src/client/index.html"}
            );
        } else if (gn.options.angular) {
            templatesToCopy.push(
                { name: "js/angular/_angularConfig.js", path: "./config.js"},
                { name: "js/angular/_app.js", path: "./src/client/app/app.js"},
                { name: "html/angular/_angularIndex.html", path: "./src/client/index.html"}
            );
        }
        else {
            templatesToCopy.push(
                { name: "js/_app.js", path: "./src/client/app/app.js"},
                { name: "js/_config.js", path: "./config.js"},
                { name: "html/_index.html", path: "./src/client/index.html"}
            );
        }

        templatesToCopy.forEach(function (element, index, array) {
            gn.fs.copyTpl(gn.templatePath(element.name), gn.destinationPath(element.path), { appName: gn.appName });
        });
    },

    install: function () {
        if (this.options.aurelia || this.options.angular) {
            this.installDependencies();
        }
    },

    end: function () {
        this.log("\n----->>> Mission Accomplished! <<<-----");
    }

});
