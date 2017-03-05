const fb = require("fuse-box")

const fuse = fb.FuseBox.init({
  homeDir: "src",
  outFile: "bundle.js",
  plugins: [
    [
      fb.SassPlugin(),
      fb.CSSPlugin()
    ],
    fb.BabelPlugin()
  ]
})

fuse.devServer("> app.js", {
  port: 8000
})
