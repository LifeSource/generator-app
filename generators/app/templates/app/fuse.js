const fb = require("fuse-box")

const fuse = fb.FuseBox.init({
  homeDir: "src",
  outFile: "dist/bundle.js",
  sourcemaps: true,
  plugins: [
    fb.BabelPlugin(),
    [
      fb.SassPlugin(),
      fb.CSSPlugin()
    ]
  ]
})

fuse.devServer(">index.jsx", {
  port: 8000
})
