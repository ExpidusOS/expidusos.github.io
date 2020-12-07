const path = require('path');
const nodeExternals = require('webpack-node-externals');

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
		allowlist: ['winston', 'express']
	})],
	resolve: {
		extensions: ['.tsx', '.ts', '.js']
	},
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
