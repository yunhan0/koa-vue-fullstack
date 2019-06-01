const webpack = require('webpack')
// Simplifies creation of HTML files to serve your webpack bundles
const HtmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const path = require('path')

module.exports = function(env) {
  var CONFIG = {
    entry: {
      app: './src/main.js',
    },
    plugins: [
      new webpack.HashedModuleIdsPlugin(), // so that file hashes don't change unexpectedly
    ],
    output: {
      /*global __dirname*/
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].bundle.js',
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
          use: ['style-loader', 'css-loader']
        },
        {
          test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,
          use: 'url-loader?limit=1024'
        }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({template: './index.html'}),
      new VueLoaderPlugin()
    ],
    optimization: {
      runtimeChunk: 'single',
      splitChunks: {
        chunks: 'all',
        maxInitialRequests: Infinity,
        minSize: 0,
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name(module) {
              // get the name. E.g. node_modules/packageName/not/this/part.js
              // or node_modules/packageName
              const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];

              // npm package names are URL-safe, but some servers don't like @ symbols
              return `npm.${packageName.replace('@', '')}`;
            }
          }
        }
      }
    }
  }

  switch (env) {
  case 'dev':
    console.log('=== In the development mode ===')
    CONFIG.mode = 'development'
    CONFIG.plugins.push(new webpack.HotModuleReplacementPlugin())
    CONFIG.devServer = {
      // contentBase: '', # Confuse
      hot: true,
      // historyApiFallback: true
    }
    break
  case 'prod':
    console.log('=== In the production mode ===')
    CONFIG.mode = 'production'
    // Turn on Production Mode
    CONFIG.plugins.push(new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }))
    break
  }

  return CONFIG
}