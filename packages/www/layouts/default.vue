<template>
	<v-app>
		<Panel title="ExpidusOS" :items="items" />
		<v-main>
			<Nuxt />
		</v-main>
	</v-app>
</template>
<script>
import {default as expidusCommon} from '@expidus/common'
const {Panel, PanelItem} = expidusCommon

export default {
	components: {
		Panel,
		PanelItem
	},
	data: () => ({
		items: [
			{
				title: 'Home',
				url: '/',
				icon: 'mdi-home'
			}
		]
	})
}
</script>
