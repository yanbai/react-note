const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.ssr.base.conf.js')
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin')

const result = merge(baseConfig, {
  entry: path.resolve(__dirname, '../ssr-server/entry-client.js'),
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: "manifest",
      minChunks: Infinity
    }),
    new VueSSRClientPlugin()
  ]
})
module.exports = result
