const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const config = require('../config')
const utils = require('./utils')

module.exports = {
  context: path.resolve(__dirname, '../'),
  devtool: false,
  output: {
    path: path.resolve(__dirname, '../ssr-server/dist'),
    publicPath: '/dist/',
    filename: '[name].[chunkhash].js'
  },
  resolve: {
    modules: [
      path.resolve(__dirname, '../src/components'),
      path.resolve(__dirname, '../src'),
      path.resolve(__dirname, '../node_modules')
    ],
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      'ssr-server': path.resolve(__dirname, '../ssr-server'),
      'components': path.resolve(__dirname, '../src/components'),
      'src': path.resolve(__dirname, '../src'),
      'assets': path.resolve(__dirname, '../src/assets'),
      'fonts': path.resolve(__dirname, '../src/assets/fonts'),
      'elements': path.resolve(__dirname, '../src/components/elements'),
      'modules': path.resolve(__dirname, '../src/components/modules'),
      'widgets': path.resolve(__dirname, '../src/components/widgets'),
      'globals': path.resolve(__dirname, '../src/components/globals'),
      'utilities': path.resolve(__dirname, '../src/utilities'),
    }
  },
  module: {
    noParse: /es6-promise\.js$/, // avoid webpack shimming process
    rules: utils.styleLoaders({
      sourceMap: config.build.productionSourceMap,
      extract: true,
      usePostCSS: true
    }).concat([
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          compilerOptions: {
            preserveWhitespace: false
          }
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: '[name].[ext]?[hash]'
        }
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]'),
          publicPath: '../../'
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]'),
          publicPath: '../../'
        }
      }
    ])
  },
  plugins: [
        new webpack.optimize.ModuleConcatenationPlugin(),
        new ExtractTextPlugin({
          filename: 'common.[chunkhash].css'
        })
      ]
}
