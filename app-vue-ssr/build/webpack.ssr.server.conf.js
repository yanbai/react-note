const path = require('path')
const merge = require('webpack-merge')
const nodeExternals = require('webpack-node-externals')
const baseConfig = require('./webpack.ssr.base.conf.js')
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin')

const result = merge(baseConfig, {
  entry: path.resolve(__dirname, '../ssr-server/entry-server.js'),

  target: 'node',

  devtool: 'source-map',

  output: {
    libraryTarget: 'commonjs2'
  },

  externals: nodeExternals({
    whitelist: /\.css$/
  }),

  plugins: [
    new VueSSRServerPlugin()
  ]
})
module.exports = result
