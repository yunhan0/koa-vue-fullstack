const webpack = require('webpack')
// Simplifies creation of HTML files to serve your webpack bundles
const HtmlWebpackPlugin = require('html-webpack-plugin')
/*
 * Minify your JavaScript
 * const UglifyJSPlufin = require('uglifyjs-webpack-plugin')
 */

// Extract text from a bundle, or bundles, into a separate file.
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const path = require('path')

module.exports = function(env) {
  var CONFIG = {
    entry: {
      app: './src/main.js',
      vendor: ['vue', 'vue-router', 'vuex']
    },
    output: {
      /*global __dirname*/
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].bundle.js',
      chunkFilename: '[name].[chunkhash:8].js' // Used for code spliting
    },
    module: {
      rules: [
        {
          test: /\.js$/, exclude: /node_modules/,
          use: 'babel-loader'
        },
        {
          test: /\.vue$/,
          use: 'vue-loader'
        },
        {
          test: /\.less$/,
          use: [{
            loader: 'style-loader' // creates style nodes from JS strings
          }, {
            loader: 'css-loader' // translates CSS into CommonJS
          }, {
            loader: 'less-loader' // compiles Less to CSS
          }]
        },
        {
          test: /\.css$/,
          use: env === 'prod' ? ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [ 'css-loader' ]
          }):
            [ 'style-loader', 'css-loader' ]
        },
        {
          test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,
          use: 'url-loader?limit=1024'
        }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({template: './index.html'}),
      new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        minChunks: Infinity
      })
    ]
  }

  switch (env) {
  case 'dev':
    console.log('=== In the development mode ===')
    CONFIG.plugins.push(new webpack.HotModuleReplacementPlugin())
    CONFIG.devServer = {
      // contentBase: '', # Confuse
      hot: true,
      // historyApiFallback: true
    }
    break
  case 'prod':
    console.log('=== In the production mode ===')
    // Resolving the ERROR in js/backstage.js from UglifyJs
    CONFIG.module.rules.push(
      {
        test: /iview.src.*?js$/,
        loader: 'babel-loader'
      }
    )
    CONFIG.plugins.push(new webpack.optimize.UglifyJsPlugin())
    CONFIG.plugins.push(new ExtractTextPlugin('[name].css'))
    // Turn on Production Mode
    CONFIG.plugins.push(new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }))
    break
  }

  return CONFIG
}