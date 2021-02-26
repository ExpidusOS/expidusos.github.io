const webpack = require('webpack');
const path = require('path');
const nodeExternals = require('webpack-node-externals');
const NodemonPlugin = require('nodemon-webpack-plugin');

const mode = process.env.NODE_ENV || 'development';

module.exports = {
	entry: path.resolve(__dirname, 'src', 'index.ts'),
	mode,
	target: 'async-node',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'server.bundle.js'
	},
	externals: [nodeExternals({
		allowlist: ['winston', 'express', 'body-parser', 'express-oauth-server', 'jsonwebtoken']
	})],
	resolve: {
		extensions: ['.tsx', '.ts', '.js']
	},
	plugins: [
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': `"${mode}"`
		}),
		new NodemonPlugin()
	],
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: 'ts-loader',
				exclude: /node_modules/,
			}
		]
	}
}
