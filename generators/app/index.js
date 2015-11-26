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
            "./src/client",
            "./src/client/css",
            "./src/client/fonts",
            "./src/client/images",
            "./src/client/styles",
            "./src/server/",
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
        this.log("writing");
    },

    conflicts: function () {
        this.log("conflicts");
    },

    install: function () {
        this.log("install");
    },

    end: function () {
        this.log("end");
    }

});
