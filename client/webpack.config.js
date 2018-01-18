const webpack = require('webpack');
// Simplifies creation of HTML files to serve your webpack bundles
const HtmlWebpackPlugin = require('html-webpack-plugin');
// Minify your JavaScript
const UglifyJSPlufin = require('uglifyjs-webpack-plugin');
const path = require('path');

module.exports = function(env) {
	var CONFIG = {
		entry: './src/main.js',
		output: {
			path: path.resolve(__dirname, 'dist'),
			filename: '[name].bundle.js',
			chunkFilename: '[name].bundle.js' // Used for code spliting
		},
		module: {
			rules: [
				{
					test: /\.js$/, exclude: /node_modules/,
					loader: 'babel-loader'
				},
				{
					test: /\.vue$/,
					loader: 'vue-loader'
				},
				{
					test: /\.css$/,
					use: [ 'style-loader', 'css-loader' ]
				},
				{
					test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,
					loader: 'url-loader?limit=1024'
				}
			]
		},
		plugins: [
			new HtmlWebpackPlugin({template: './index.html'}),
			new webpack.HotModuleReplacementPlugin
		]
	}

	switch (env) {
		case 'dev':
			console.log('=== In the development mode ===');
			CONFIG.devServer = {
				// contentBase: '', # Confuse
				hot: true
			}
		break;
		case 'prod':
			console.log('=== In the production mode ===');
			CONFIG.plugins.push(new webpack.optimize.UglifyJsPlugin());
		break;
	}

	return CONFIG;
};