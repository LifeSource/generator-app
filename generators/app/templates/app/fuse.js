const fb = require("fuse-box")

const fuse = fb.FuseBox.init({
  homeDir: "src",
  outFile: "bundle.js",
  plugins: [
    fb.BabelPlugin(),
    [
      fb.SassPlugin(),
      fb.CSSPlugin()
    ]
  ]
})

fuse.devServer("> app.js", {
  port: 8000
})
