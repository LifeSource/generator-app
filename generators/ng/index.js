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
                     controllerName: this._capitalizeFirstLetter(this.name),
                     appName: this.config.get("appName") 
                 }
             );
         },

         viewModel: function () {
             this.fs.copyTpl(
                 this.templatePath("view.js"), 
                 this.destinationPath("src/client/app/" + this.name + "/" + this.name + ".controller.js"), { 
                    controllerName: this._capitalizeFirstLetter(this.name),
                    appName: this.config.get("appName")    
                 }
             );
         }
     },   

     _capitalizeFirstLetter: function (str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
     }
});
