const generators = require('yeoman-generator'),
  _ = require('lodash');

module.exports = generators.NamedBase.extend({
  constructor: function() {
    generators.NamedBase.apply(this, arguments);

    const options = {
      comp: { desc: 'Generate a react functional component.', type: String },
      all: { desc: 'Generate a react comp and test file.', type: String },
    };

    this.option('comp', options.comp);
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
    const componentName = this._capitalizeFirstLetter(this.name);
    this.fs.copyTpl(this.templatePath('component/comp.js'), this.destinationPath(`src/component/${componentName}.js`), {
      moduleName: componentName,
      appName: this.config.get('appName'),
    });
  },

  _generateSpec: function() {
    const componentName = this._capitalizeFirstLetter(this.name);
    this.fs.copyTpl(this.templatePath('test/test.js'), this.destinationPath(`src/component/${componentName}.test.js`), {
      moduleName: componentName,
    });
  },

  _capitalizeFirstLetter: function(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  },
});
