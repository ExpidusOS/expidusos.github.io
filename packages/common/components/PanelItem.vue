<template>
	<v-list-item v-if="list == true" @click="handleClick">
		<a class="text--primary" v-if="url != null" :href="url">
			<v-list-item-icon v-if="icon">
				<v-icon>{{ icon }}</v-icon>
			</v-list-item-icon>
			<v-list-item-title class="d-inline-flex" v-if="title">{{ title }}</v-list-item-title>
		</a>
		<div v-else>
			<v-list-item-icon v-if="icon">
				<v-icon>{{ icon }}</v-icon>
			</v-list-item-icon>
			<v-list-item-title class="d-inline-flex" v-if="title">{{ title }}</v-list-item-title>
		</div>
	</v-list-item>
	<v-btn v-else-if="subitems == null || subitems.length == 0" :text="title != null" :icon="icon != null" @click="handleClick">
		<a class="text--primary" v-if="url != null" :href="url">
			<v-icon v-if="icon != null">{{ icon }}</v-icon>
			<span v-if="title">{{ title }}</span>
		</a>
		<div v-else>
			<v-icon v-if="icon != null">{{ icon }}</v-icon>
			<span v-if="title">{{ title }}</span>
		</div>
	</v-btn>
	<v-menu v-else-if="subitems != null" offset-y>
		<template v-slot:activator="{ on, attrs }">
			<PanelItem :title="title" :icon="icon" v-bind="attrs" v-on="on" />
		</template>
		<v-list dense>
			<PanelItem v-for="(item, index) in subitems" :key="index" :title="item.title" :icon="item.icon" :url="item.url" :callback="item.callback" />
		</v-list>
	</v-menu>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

declare type itemCallback = () => void
interface Item {
	title?: string
	icon?: string
	url?: string
	callback?: itemCallback
	subitems?: Item[]
}

@Component
export default class PanelItem extends Vue {
	@Prop({ type: String, required: false }) readonly title!: string | undefined
	@Prop({ type: String, required: false }) readonly icon!: string | undefined
	@Prop({ type: String, required: false }) readonly url!: string | undefined
	@Prop({ type: Function, required: false }) readonly callback!: itemCallback | undefined
	@Prop({ type: Boolean, required: false }) readonly list!: Boolean
	@Prop({ type: Array, required: false }) readonly subitems!: Item[] | undefined

	handleClick() {
		if (this.url == null && this.callback != null) {
			return this.callback()
		} else if (this.url == null && this.callback == null) {
			console.warn('Cannot have neither URL or callback')
		} else if (this.url == null && this.callback == null) {
			console.warn('Cannot have both URL and callback')
		}
	}
}
</script>
<style>
a, a:hover, a:visited {
  text-decoration: none;
}
</style>
