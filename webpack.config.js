const webpack = require('webpack');
// Simplifies creation of HTML files to serve your webpack bundles
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
    entry: './client/app/app.js',
    output: {
        path: path.resolve(__dirname, '/dist'),
        filename: 'bundle.js'
    }   
    // plugins: [
    //     new webpack.optimize.UglifyJsPlugin(),
    //     new HtmlWebpackPlugin({template: './src/index.html'})
    // ]
};