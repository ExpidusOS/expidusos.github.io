const webpack = require('webpack');
const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

const mode = process.env.NODE_ENV || 'development';

module.exports = {
	entry: {
		plugin: path.resolve(__dirname, 'plugin.ts')
	},
	mode,
	target: 'node',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: '[name].bundle.js'
	},
	resolve: {
		extensions: ['.tsx', '.ts', '.js']
	},
	plugins: [
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': `"${mode}"`
		}),
		new VueLoaderPlugin()
	],
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				loader: 'ts-loader',
				options: {
					appendTsSuffixTo: [/\.vue$/]
				},
				exclude: /node_modules/,
			},
			{
				test: /\.vue?$/,
				use: 'vue-loader',
				exclude: /node_modules/,
			}
		]
	}
}
