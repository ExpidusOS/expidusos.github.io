<template>
	<div class="navigation">
		<v-app-bar class="nav-desktop">
			<v-toolbar-title>{{ title }}</v-toolbar-title>
			<slot name="before-spacer-desktop" />
			<slot name="before-spacer" />
			<v-spacer />
			<PanelItem v-for="(item, index) in items" :key="index" v-bind="item" />
			<slot />
			<slot name="desktop" />
			<slot name="after-spacer" />
			<slot name="after-spacer-mobile" />
		</v-app-bar>
		<v-app-bar class="nav-mobile">
			<v-toolbar-title>{{ title }}</v-toolbar-title>
			<slot name="before-spacer-mobile" />
			<slot name="before-spacer" />
			<v-spacer />
			<slot name="after-spacer" />
			<slot name="after-spacer-mobile" />
		</v-app-bar>
		<v-navigation-drawer>
			<PanelItem v-for="(item, index) in items" :key="index" v-bind="item" />
			<slot />
			<slot name="mobile" />
		</v-navigation-drawer>
	</div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class PanelItem extends Vue {
	@Prop({ type: String, required: true }) readonly title!: String
	@Prop({ type: Array, required: false }) readonly items!: Object[]
}
</script>
