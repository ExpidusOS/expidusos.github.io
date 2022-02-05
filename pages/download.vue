<template>
	<div style="padding-top: 25px">
	  <v-row justify="center" align="start">
			<v-col cols="12" md="10" lg="8" xl="8">
        <p>{{ $t('download') }} <a href="https://build.expidusos.com">{{ $t('download-link') }}</a></p>
			</v-col>
		</v-row>
	</div>
</template>
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