const generators = require('yeoman-generator'),
  _ = require('lodash');

module.exports = generators.NamedBase.extend({
  constructor: function() {
    generators.NamedBase.apply(this, arguments);

    const options = {
      com: { desc: 'Generate a react functional component.', type: String },
      all: { desc: 'Generate a react comp and test file.', type: String },
    };

    this.option('mod', options.mod);
    this.option('all', options.all);
  },

  writing: function() {
    if (this.options.com) this._generateComponent();

    if (this.options.all) {
      this._generateComponent();
      this._generateSpec();
    }
  },

  _generateComponent: function() {
    this.fs.copyTpl(this.templatePath('component/comp.js'), this.destinationPath(`component/${this.name}.js`), {
      moduleName: this.name,
      appName: this.config.get('appName'),
    });
  },

  _generateSpec: function() {
    this.fs.copyTpl(this.templatePath('test/test.js'), this.destinationPath(`component/${this.name}.test.js`), {
      moduleName: this._capitalizeFirstLetter(this.name),
    });
  },

  _capitalizeFirstLetter: function(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  },
});
