var generators = require("yeoman-generator"),
    _ = require("lodash");

module.exports = generators.NamedBase.extend({

    constructor: function() {
        generators.NamedBase.apply(this, arguments);
    },

     writing : {
         model: function() {
             this.fs.copyTpl(
                 this.templatePath("model.js"),
                 this.destinationPath("server/models/" + this.name + "/" + this.name + ".model.js"), {
                     modelName: this.name,
                     modelClassName: this._capitalizeFirstLetter(this.name)
                 }
             );
         },

         modelRoute: function() {
             
             this.fs.copyTpl(
                 this.templatePath("model.route.js"),
                 this.destinationPath("server/routes/" + this.name + "/" + this.name + ".route.js"), {
                     modelName: this.name
                 }
             );
         },

         modelController: function () {
             this.fs.copyTpl(
                 this.templatePath("model.controller.js"), 
                 this.destinationPath("server/controllers/" + this.name + "/" + this.name + ".controller.js"), { 
                     modelName: this.name,
                     modelClassName: this._capitalizeFirstLetter(this.name)
                 }
             );
         }
     },   

     _capitalizeFirstLetter: function (str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
     }
});
