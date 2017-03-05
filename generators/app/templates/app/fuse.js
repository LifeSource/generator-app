const fb = require("fuse-box")

const fuse = fb.FuseBox.init({
  homeDir: "src",
  outFile: "app.js",
  plugins: [
    [
      fb.SassPlugin(),
      fb.CSSPlugin(),
      fb.BabelPlugin()
    ]
  ]
})

fuse.devServer("> index.js", {
  port: 8000
})
