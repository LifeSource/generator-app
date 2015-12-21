var generators = require("yeoman-generator"),
    _ = require("lodash");

module.exports = generators.NamedBase.extend({

    constructor: function() {
        generators.NamedBase.apply(this, arguments);
    },

     writing : {

         view: function() {
             this.fs.copyTpl(
             this.templatePath("view.html"),
             this.destinationPath("src/client/app/" + this.name + "/" + this.name + ".html"), {
                    className: this.name
                }
             );
         },

         viewModel: function () {
             this.fs.copyTpl(
                 this.templatePath("view.js"), 
                 this.destinationPath("src/client/app/" + this.name + "/" + this.name + ".js"), 
                 { className: this.name }
             );
         }
     }   

});
