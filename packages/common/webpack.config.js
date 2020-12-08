const webpack = require('webpack');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin');

const mode = process.env.NODE_ENV || 'development';

module.exports = {
	entry: path.resolve(__dirname, 'index.ts'),
	mode,
	devtool: 'source-map',
	output: {
		path: path.resolve(__dirname, 'dist'),
		libraryTarget: 'umd',
		umdNamedDefine: true,
		filename: 'index.bundle.js',
		globalObject: 'typeof self !== \'undefined\' ? self : this'
	},
	resolve: {
		alias: {
			vue: 'vue/dist/vue.js'
		},
		extensions: ['.tsx', '.ts', '.js']
	},
	plugins: [
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': `"${mode}"`
		}),
		new VueLoaderPlugin(),
		new MiniCssExtractPlugin({
			filename: 'style.css'
		})
	],
	module: {
		rules: [
			{
				test: /\.css$/,
				use: [
					MiniCssExtractPlugin.loader,
					'css-loader'
				]
			},
			{
				test: /\.tsx?$/,
				loader: 'ts-loader',
				options: {
					appendTsSuffixTo: [/\.vue$/]
				},
				exclude: /node_modules/,
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader'
			},
			{
				test: /\.vue?$/,
				use: 'vue-loader',
				exclude: /node_modules/,
			}
		]
	}
}
