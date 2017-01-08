var path = require("path")

module.exports = function() {

  var port = process.env.PORT || 3000,
    env = process.env.NODE_ENV || "dev"

  var root = "./"

  var config = {
    env: env,
    port: port,
    root: root,
    appNamePrompt: {
      type: "input",
      name: "appName",
      message: "Please enter your app name: ",
      default: path.basename(process.cwd())
    },
    frameworkPrompt: {
      type: "list",
      name: "framework",
      message: "Which client side framework would you like to use?:",
      choices: [{
          name: "none",
          value: "none"
        },
        {
          name: "aurelia",
          value: "aurelia"
        },
        {
          name: "angular",
          value: "angular"
        }
      ]
    }

  }

  config.getAureliaOptions = function() {

    var options = [{
        name: "aurelia",
        setup: {
          desc: "Uses the Aurelia development setup.",
          type: String
        }
      },
      {
        name: "angular",
        setup: {
          desc: "Uses the Angular development setup.",
          type: String
        }
      }
    ]

    return options
  }

  return config

}
