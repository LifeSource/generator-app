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

        this.argument('appName', { type: String, required: false });
        this.appName = _.camelCase(this.appName);

        var options = config.getAureliaOptions();
        options.forEach(function (option) {
            this.option(option.name, option.setup);
        }.bind(this));
    },

    initializing: function () {
        this.log(yosay("Welcome to web app generator!"));
    },

    _frameworkOptionSpecified: function() {
        return (this.options.angular || this.options.aurelia || this.options.react);
    },

    prompting: function () {

        var done = this.async();
        if (this.appName) { return; }

        var prompts = [config.appNamePrompt];

        if (!this._frameworkOptionSpecified()) {
            prompts.push(config.frameworkPrompt);
        }

        this.prompt(prompts, function (answers) {
            this.config.set("appName", answers.appName);
            this.config.save();
            if (!this._frameworkOptionSpecified()) {
                this.framework = answers.framework;
            }
            done();
        }.bind(this));
    },

    configuring: function () {

    },

    default: function () {

    },

    writing: {

        settings: function () {
            this.directory("settings", "./");
        },

        packageJson: function () {
            this.fs.copyTpl(
                this.templatePath("json/_package.json"),
                this.destinationPath("./package.json"),
                { appName: this.config.get("appName") }
            );
        },

        bowerJson: function() {
            var bowerJson = {
                name: this.config.get("appName"),
                license: "MIT",
                dependencies: {},
                devDependencies: {}
            };

            if (this.options.angular || this.framework === "angular") {
                bowerJson.dependencies["angular"] = "~1.4.8";
                bowerJson.dependencies["angular-resource"] = "~1.4.8";
                bowerJson.dependencies["angular-bootstrap"] = "~0.13.4";
                bowerJson.dependencies["angular-ui-router"] = "~0.2.15";
                bowerJson.devDependencies["angular-mocks"] = "~1.4.8";
                bowerJson.devDependencies["sinon"] = "~1.12.1";
                bowerJson.devDependencies["bardjs"] = "~0.1.8";
                this.fs.writeJSON("bower.json", bowerJson);
                this.copy("bower/.bowerrc", ".bowerrc");
            }
        },

        server: function () {
            this.directory("server", "src/server");
        },

        scripts: function () {

            if (this.options.aurelia || this.framework === "aurelia") {
                this.directory("frameworks/aurelia", "src/client");
            }

            if (this.options.angular || this.framework === "angular") {
                this.directory("frameworks/angular", "src/client");
            }

            if (this.options.react || this.framework === "react") {
                this.directory("frameworks/react", "src/client");
            }

            this.copy("js/_config.js", "./config.js");
            this.copy("js/_gulpfile.js", "./gulpfile.js");
        },

        staticAssets: function () {
            this.directory("css", "src/client/css");
            this.directory("styles", "src/client/styles");
            this.directory("images", "src/client/images");
            this.directory("fonts", "src/client/fonts");
        }
    },

    install: function () {
        if (this._frameworkOptionSpecified()) {
            this.installDependencies();
        }
    },

    end: function () {
        this.log(chalk.green.bold("\n----->>> Mission Accomplished! <<<-----\n"));
    }

});
