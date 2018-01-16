const webpack = require('webpack');
// Simplifies creation of HTML files to serve your webpack bundles
// const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
    entry: './src/main.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/dist/',
        filename: 'bundle.js'
    },
    module: {
        rules: [
          { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" },
          { test: /\.vue$/, loader: 'vue-loader' }
        ]
    }   
    // plugins: [
    //     new webpack.optimize.UglifyJsPlugin(),
    //     new HtmlWebpackPlugin({template: './src/index.html'})
    // ]
};