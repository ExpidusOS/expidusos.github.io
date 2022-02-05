<template>
	<div style="padding-top: 25px">
	  <v-row justify="center" align="start">
			<v-col cols="12" md="10" lg="8" xl="8">
        <v-card>
          <v-card-text>{{ $t('download') }} <a href="https://build.expidusos.com">{{ $t('download-link') }}</a></v-card-text>
        </v-card>
			</v-col>
		</v-row>
	</div>
</template>
<i18n>
{
  "en": {
    "download": "ExpidusOS is available from",
    "download-link": "here"
  }
}
</i18n>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component
export default class PageIndex extends Vue {
	head() {
		return {
			title: 'Download',
			meta: [
				{ hid: 'og:title', name: 'og:title', content: 'Download | ExpidusOS' }
			]
		}
	}
}
</script>