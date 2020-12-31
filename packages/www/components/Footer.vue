<template>
	<v-footer>
		<v-card flat tile width="100%">
			<v-row justify="center" no-gutters>
				<v-btn v-for="(link, index) in links" :key="index" text rounded class="my-2">
					<a :href="link.url">{{ link.title }}</a>
				</v-btn>
			</v-row>
			<v-container class="pl-auto" @click="toggleTheme">
				<v-btn text>
					<v-icon>mdi-flashlight</v-icon>
					Toggle dark/light mode
				</v-btn>
			</v-container>
			<v-card-text>
				<v-icon>mdi-copyright</v-icon> {{ new Date().getFullYear() }} - ExpidusOS, developed by <a href="http://midstall.com">Midstall Software</a>.
			</v-card-text>
		</v-card>
	</v-footer>
</template>
<script>
export default {
	data() {
		return {
			links: [
				{
					title: 'Home',
					url: '/'
				},
				{
					title: 'Demo',
					url: '/demo'
				},
				{
					title: 'GitHub',
					url: 'https://github.com/ExpidusOS'
				}
			]
		}
	},
	methods: {
		toggleTheme: ({ view }) => view.$nuxt.$toggleTheme()
	}
}
</script>
