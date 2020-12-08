import path from 'path'

export default function nuxtBootstrapVue(options) {
	this.addPlugin({
		src: path.resolve(__dirname, 'dist', 'plugin.bundle.js'),
		options
	})
}
