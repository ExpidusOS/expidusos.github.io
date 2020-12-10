<template>
	<v-container>
		<slot />
	</v-container>
</template>
<script>
export default {
	props: {
		zIndex: {
			type: Number,
			required: true
		},
		id: {
			type: String,
			required: true
		}
	},
	computed: {
		style() {
			return `z-index: ${this.zIndex}`
		}
	}
}
</script>
