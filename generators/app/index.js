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

    initializing: function () {

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

    configuring: function () {

    },

    default: function () {

    },

    writing: {

        settings: function () {
            this.directory("settings", "./");
        },

        packageJson: function () {
            this.directory("json", "./");
        },

        server: function () {
            this.directory("server", "src/server");
        },

        scripts: function () {
            if (this.options.aurelia)
                this.directory("aurelia", "src/client");

            if (this.options.angular)
                this.directory("angular", "src/client");
        },

        staticAssets: function () {
            this.directory("css", "src/client/css");
            this.directory("styles", "src/client/styles");
            this.directory("images", "src/client/images");
            this.directory("fonts", "src/client/fonts");
        }
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
