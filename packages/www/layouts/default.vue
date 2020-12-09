<template>
	<v-app>
		<Panel title="ExpidusOS" :items="items" />
		<v-main>
			<Nuxt />
		</v-main>
		<v-footer>
			<v-card flat tile width="100%">
				<v-container class="pl-auto">
					<v-btn text @click="$toggleTheme">
						<v-btn-icon><v-icon>mdi-flashlight</v-icon></v-btn-icon>
						Toggle dark/light mode
					</v-btn>
				</v-container>
				<v-card-text>
					<v-icon>mdi-copyright</v-icon> {{ new Date().getFullYear() }} - ExpidusOS, developed by <a href="http://midstall.com">Midstall Software</a>.
				</v-card-text>
			</v-card>
		</v-footer>
	</v-app>
</template>
<script>
import {default as expidusCommon} from '@expidus/common'
const {Panel, PanelItem} = expidusCommon

export default {
	components: {
		Panel,
		PanelItem
	},
	data: () => ({
		items: [
			{
				title: 'Home',
				url: '/',
				icon: 'mdi-home'
			},
			{
				title: 'Download',
				url: '/download',
				icon: 'mdi-download'
			}
		]
	})
}
</script>
