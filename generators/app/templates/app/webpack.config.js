const path = require("path")
const BrowserSync = require("browser-sync-webpack-plugin")
const ExtractTextPlugin = require("extract-text-webpack-plugin")

module.exports = {
  context: path.resolve("src"),
  entry: ["./app.js"],
  output: {
    path: path.resolve("dist"),
    publicPath: "/dist",
    filename: "scripts/app.js"
  },
  plugins: [
    new ExtractTextPlugin("styles/styles.css"),
    new BrowserSync({
      host: "localhost",
      port: 3000,
      files: "**/*.*",
      server: {
        baseDir: ["dist"]
      }
    })
  ],
  devServer: {
    contentBase: "dist"
  },
  devtool: "inline-source-map",
  resolve: {
    extensions: ["", ".webpack.js", ".web.js", ".ts", "tsx", ".js", "jsx"]
  },
  module: {
    loaders: [{
        test: /\.css$/,
        exclude: /node_modules/,
        loader: ExtractTextPlugin.extract("style", "css!autoprefixer")
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        loader: ExtractTextPlugin.extract("style", "css!autoprefixer!sass")
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      }
    ]
  }
}
