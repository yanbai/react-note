# min css extract plugin
https://www.npmjs.com/package/mini-css-extract-plugin

```bash
This plugin extracts CSS into separate files. It creates a CSS file per JS file which contains CSS. It supports On-Demand-Loading of CSS and SourceMaps.
It builds on top of a new webpack v4 feature (module types) and requires webpack 4 to work.
Compared to the extract-text-webpack-plugin:
	• Async loading
	• No duplicate compilation (performance)
	• Easier to use
Specific to CSS
```
```js
// webpack.config.js
const MiniCssExtractPlugin = require("min-css-extract-plugin")

module.exports = {
  ...
  module: {
    rules: [{
      test: /\.scss$/,
      use: [
        // fallback to style-loader in development
        process.env.NODE_ENV !== 'production' ? 'style-loader' : MiniCssExtractPlugin.loader,
        "css-loader",
        "sass-loader"
      ]
    }]
  },
  plugins: [
    new MiniCssExtractPlugin({
      // options similar to the same options in webpackOptions.output
      // both options are optional
      filename: "[name].css",
      chunkFilename: "[id].css"
    })
  ]
}
```
