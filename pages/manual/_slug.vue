<template>
  <v-row justify="center" align="center" style="padding-top: 16px">
		<v-col cols="12" sm="12" md="8" lg="6">
			<v-card>
				<v-card-text>
					<nuxt-content :document="page" />
				</v-card-text>
			</v-card>
		</v-col>
	</v-row>
</template>
<script>
export default {
	async asyncData({ params, $content, i18n }) {
		const page = await $content('manual', params.slug, i18n.locale).fetch()
		return { page }
	}
}
</script>
