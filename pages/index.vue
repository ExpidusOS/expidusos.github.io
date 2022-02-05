<template>
	<div style="padding-top: 25px">
	  <v-row justify="center" align="start">
			<v-col cols="12" md="10" lg="8" xl="8">
				<v-parallax :src="require('~/assets/img/expidusos.png')">
				  <v-row justify="left" align="end">
						<v-col cols="6">
							<h2 class="image-caption">{{ $t('image-caption') }}</h2>
						</v-col>
					</v-row>
				</v-parallax>
			</v-col>
		</v-row>
	</div>
</template>
<i18n>
{
	"en": {
		"image-caption": "0.1.1-prealpha coming soon..."
	}
}
</i18n>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component
export default class PageIndex extends Vue {
	head() {
		return {
			title: 'Home',
			meta: [
				{ hid: 'og:title', name: 'og:title', content: 'Home | ExpidusOS' }
			]
		}
	}
}
</script>
<style>
.image-caption {
	margin-bottom: 32pt;
	margin-left: 32pt;
}
</style>
