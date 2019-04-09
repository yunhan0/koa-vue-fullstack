const webpack = require('webpack')
// Simplifies creation of HTML files to serve your webpack bundles
const HtmlWebpackPlugin = require('html-webpack-plugin')
// Js optimization
const TerserPlugin = require('terser-webpack-plugin')
// Css optimization
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
// Css extraction
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// Circular dependency detection
const CircularDependencyPlugin = require('circular-dependency-plugin')

const VueLoaderPlugin = require('vue-loader/lib/plugin')

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
          use: [
            'vue-style-loader', // creates style nodes from JS strings
            'css-loader', // translates CSS into CommonJS
            // compiles Less to CSS
            {
              loader: 'less-loader',
              options: {
                javascriptEnabled: true
              }
            }
          ]
        },
        {
          test: /\.css$/,
          use: env === 'prod' ? [
            {
              loader: MiniCssExtractPlugin.loader,
            },
            'css-loader',
          ]:
            [ 'vue-style-loader', 'css-loader' ]
        },
        {
          test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,
          use: 'url-loader?limit=1024'
        }
      ]
    },
    plugins: [
      new VueLoaderPlugin(),
      new HtmlWebpackPlugin({template: './index.html'}),
      new CircularDependencyPlugin({
        // exclude detection of files based on a RegExp
        exclude: /a\.js|node_modules/,
        // add errors to webpack instead of warnings
        failOnError: true,
        // allow import cycles that include an asyncronous import,
        // e.g. via import(/* webpackMode: "weak" */ './file.js')
        allowAsyncCycles: false,
        // set the current working directory for displaying module paths
        // eslint-disable-next-line no-undef
        cwd: process.cwd(),
      })
    ],
    optimization: {
      minimizer: [
        new TerserPlugin({}),
        new OptimizeCSSAssetsPlugin({})
      ],
      splitChunks: {
        /*
         * https://medium.com/dailyjs/webpack-4-splitchunks-plugin-d9fbbe091fd0
         * https://hackernoon.com/the-100-correct-way-to-split-your-chunks-with-webpack-f8a9df5b7758
         */
        chunks: 'all'
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
    // Resolving the ERROR in js/backstage.js from UglifyJs
    CONFIG.module.rules.push(
      {
        test: /iview.src.*?js$/,
        loader: 'babel-loader'
      }
    )
    CONFIG.plugins.push(new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css'
    }))
    break
  }

  return CONFIG
}
