var generators = require("yeoman-generator"),
  _ = require("lodash"),
  util = require('util'),
  path = require('path'),
  yosay = require('yosay'),
  chalk = require('chalk'),
  mkdirp = require("mkdirp"),
  config = require("../../config")();

module.exports = generators.Base.extend({

  constructor: function() {

    generators.Base.apply(this, arguments);

    this.argument('appName', {
      type: String,
      required: false
    });
    this.appName = _.camelCase(this.appName);

    var options = config.getAureliaOptions();
    options.forEach(function(option) {
      this.option(option.name, option.setup);
    }.bind(this));
  },

  initializing: function() {
    this.log(yosay("Welcome to web app generator!"));
  },

  _frameworkOptionSpecified: function() {
    return (this.options.angular || this.options.aurelia || this.options.react);
  },

  prompting: function() {
  },

  configuring: function() {

  },

  default: function() {

  },

  writing: function() {
    this.directory('app', './')
  },

  install: function() {
    this.spawnCommand('yarn');
  },

  end: function() {
    this.log(chalk.green.bold("\n----->>> Mission Accomplished! <<<-----\n"));
  }

});
