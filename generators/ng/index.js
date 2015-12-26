var generators = require("yeoman-generator"),
    _ = require("lodash");

module.exports = generators.NamedBase.extend({

    constructor: function() {
        generators.NamedBase.apply(this, arguments);

        var options = {
            mod: { desc: "Generate an angular module file.", type: String }, 
            ctrl: { desc: "Generate an angular controller and view template.", type: String }, 
            serv: { desc: "Generate an angular service for XHR requests to an API.", type: String },
            all: { desc: "Generate a service, controller, template and module file.", type: String }
        };

        this.option("mod", options.mod);
        this.option("ctrl", options.ctrl);
        this.option("serv", options.serv);
        this.option("all", options.all);
    },

     writing : function() {

         if (this.options.mod)
             this._generateModule();
         if (this.options.ctrl)
             this._generateController();
         if (this.options.serv)
             this._generateService(); 
         
         if (this.options.all) {
             this._generateModule();
             this._generateService(); 
             this._generateController();
         }
     },   

     _generateModule: function() {
         this.fs.copyTpl(
             this.templatePath("module/module.js"),
             this.destinationPath("src/client/app/" + this.name + "/" + this.name + ".module.js"), {
                 moduleName: this.name,
                 appName: this.config.get("appName") 
             }
         );
     },

     _generateController: function () {
         this.fs.copyTpl(
             this.templatePath("controller/view.html"),
             this.destinationPath("src/client/app/" + this.name + "/" + this.name + ".html"), {
                 controllerName: this._capitalizeFirstLetter(this.name),
                 appName: this.config.get("appName") 
             }
         );

         this.fs.copyTpl(
             this.templatePath("controller/view.js"), 
             this.destinationPath("src/client/app/" + this.name + "/" + this.name + ".controller.js"), { 
                    moduleName: this.name,
                    controllerName: this._capitalizeFirstLetter(this.name),
                    appName: this.config.get("appName")    
                 }
             );
     },

     _generateService: function() {
         this.fs.copyTpl(
             this.templatePath("service/service.js"), 
             this.destinationPath("src/client/app/" + this.name + "/" + this.name + ".service.js"), { 
                    serviceName: this.name,
                    appName: this.config.get("appName")    
                 }
             );
     },

     _capitalizeFirstLetter: function (str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
     }
});
