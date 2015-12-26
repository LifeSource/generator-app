var generators = require("yeoman-generator"),
    _ = require("lodash");

module.exports = generators.NamedBase.extend({

    constructor: function() {
        generators.NamedBase.apply(this, arguments);

        var options = {
            viewModel: { desc: "Generate a view + model pair.", type: String }
        };

        this.option("vm", options.viewModel);
    },

     writing: function() {

        if (this.options.vm)
            this._generateViewModel();
     },   

     _generateViewModel: function() {

         this._copyTemplates(
             "viewModel/view.html", 
             "src/client/app/" + this.name + "/" + this.name + ".html",
             { className: this._capitalizeFirstLetter(this.name)  }
         );   
            
         this._copyTemplates(
             "viewModel/view.js", 
             "src/client/app/" + this.name + "/" + this.name + ".js", 
             { className: this._capitalizeFirstLetter(this.name)  }
         );
     },
       
    _copyTemplates: function (source, dest, options) {
        this.fs.copyTpl( this.templatePath(source), this.destinationPath(dest), options);
    },

     _capitalizeFirstLetter: function (str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
     }

});
