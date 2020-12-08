<template>
	<v-btn v-if="subitems == null || subitems.length == 0" :text="title != null" :icon="icon != null" @click="handleClick">
		<v-icon v-if="icon != null">{{ icon }}</v-icon>
		<span v-if="title">{{ title }}</span>
	</v-btn>
	<v-menu v-else-if="subitems != null" offset-y>
		<template v-slot:activator="{ on, attrs }">
			<PanelItem :title="title" :icon="icon" v-bind="attrs" v-on="on" />
		</template>
		<v-list>
			<PanelItem v-for="(item, index) in subitems" :key="index" :title="item.title" :icon="item.icon" :url="item.url" :callback="item.callback" />
		</v-list>
	</v-menu>
	<v-list-item v-else @click="handleClick">
		<v-list-item-icon v-if="icon">
			<v-icon>{{ icon }}</v-icon>
		</v-list-item-icon>
		<v-list-item-title v-if="title">{{ title }}</v-list-item-title>
	</v-list-item>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

declare type itemCallback = () => void
interface Item {
	title?: String
	icon?: String
	url?: String
	callback?: itemCallback
	subitems?: Item[]
}

@Component
export default class PanelItem extends Vue {
	@Prop({ type: String, required: false }) readonly title!: String | undefined
	@Prop({ type: String, required: false }) readonly icon!: String | undefined
	@Prop({ type: String, required: false }) readonly url!: String | undefined
	@Prop({ type: Function, required: false }) readonly callback!: itemCallback | undefined
	@Prop({ type: Array, required: false }) readonly subitems!: Item[] | undefined

	handleClick() {
		if (this.url == null && this.callback != null) {
			return this.callback()
		} else if (this.url != null && this.callback == null) {
			// TODO: fixme return this.$router.push(this.url)
		} else if (this.url == null && this.callback == null) {
			console.warn('Cannot have neither URL or callback')
		} else if (this.url == null && this.callback == null) {
			console.warn('Cannot have both URL and callback')
		}
	}
}
</script>
