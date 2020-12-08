import Panel from './components/Panel.vue'
import PanelItem from './components/PanelItem.vue'
import Vue from 'vue'

interface PluginOptions {
}

const plugin = {
	install(Vue: Vue.VueConstructor, options: PluginOptions) {
		Vue.component('PanelItem', PanelItem)
		Vue.component('Panel', Panel)
		// TODO: FIXME so that these components are used globally
	}
}

Vue.use(plugin)
