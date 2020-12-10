<template>
	<v-container :style="style" @click="$emit('focus')">
		<v-card>
			<v-toolbar class="d-md-block d-lg-block d-xl-block d-none" @mousedown="e => $emit('mousedown', e)">
				<v-icon>{{ icon }}</v-icon>
				<v-toolbar-title v-text="name" />
				<v-spacer />
				<v-icon @click="$emit('minimize')">mdi-window-minimize</v-icon>
				<v-icon @click="$emit('maximize')">mdi-window-maximize</v-icon>
				<v-icon @click="$emit('close')">mdi-window-close</v-icon>
			</v-toolbar>
			<slot />
		</v-card>
	</v-container>
</template>
<script>
export default {
	props: {
		data: {
			type: Object,
			required: true
		},
		name: {
			type: String,
			required: true
		},
		icon: {
			type: String,
			required: true
		}
	},
	computed: {
		style() {
			return {
				position: 'absolute',
				left: this.data.position.x + 'px',
				top: this.data.position.y + 'px',
				zIndex: this.data.zIndex
			}
		}
	}
}
</script>
