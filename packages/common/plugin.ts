import Panel from './components/Panel.vue'
import PanelItem from './components/PanelItem.vue'
import { Plugin } from '@nuxt/types'
import Vue from 'vue'

interface PluginOptions {
}

Vue.use({
	install(vue: Vue.VueConstructor, options: PluginOptions) {
		vue.component('PanelItem', PanelItem)
		vue.component('Panel', Panel)
		// TODO: FIXME so that these components are used globally
	}
})

const plugin: Plugin = (context, inject) => {
	console.log(context)
}

export default plugin
