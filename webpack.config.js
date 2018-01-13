const webpack = require('webpack');
// Simplifies creation of HTML files to serve your webpack bundles
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
    context: path.resolve(__dirname, 'client'),
    entry: './app/app.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/dist/',
        filename: 'bundle.js'
    },
    devServer: {
        contentBase: path.join(__dirname, 'client'),
        compress: true
    },
    module: {
        rules: [
          { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }
        ]
    }   
    // plugins: [
    //     new webpack.optimize.UglifyJsPlugin(),
    //     new HtmlWebpackPlugin({template: './src/index.html'})
    // ]
};