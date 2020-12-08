<template>
	<div class="navigation">
		<v-app-bar class="nav-desktop d-md-block d-lg-block d-xl-block d-none">
			<v-toolbar-title>{{ title }}</v-toolbar-title>
			<slot name="before-spacer-desktop" />
			<slot name="before-spacer" />
			<v-spacer />
			<PanelItem v-for="(item, index) in items" :key="index" v-bind="item" :title="null" />
			<slot />
			<slot name="desktop" />
			<slot name="after-spacer" />
			<slot name="after-spacer-mobile" />
		</v-app-bar>
		<v-app-bar class="nav-mobile d-sm-block d-md-none d-lg-none d-xl-none d-block">
			<v-app-bar-nav-icon @click="drawer = !drawer" />
			<v-toolbar-title>{{ title }}</v-toolbar-title>
			<slot name="before-spacer-mobile" />
			<slot name="before-spacer" />
			<v-spacer />
			<slot name="after-spacer" />
			<slot name="after-spacer-mobile" />
		</v-app-bar>
		<v-navigation-drawer v-model="drawer" absolute temporary>
			<v-list>
				<PanelItem v-for="(item, index) in items" :key="index" v-bind="item" :list="true" />
				<slot />
				<slot name="mobile" />
			</v-list>
		</v-navigation-drawer>
	</div>
</template>
<script>
import PanelItem from './PanelItem.vue'

export default {
	name: 'Panel',
	data: () => ({ drawer: false }),
	props: {
		title: {
			type: String,
			required: true
		},
		items: {
			type: Array,
			required: false
		}
	},
	components: {
		PanelItem
	}
}
</script>
