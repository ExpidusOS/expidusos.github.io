<template>
  <v-app dark>
		<v-app-bar class="d-md-block d-lg-block d-xl-block d-none" dense hide-on-scroll>
			<v-toolbar-title>ExpidusOS</v-toolbar-title>
			<v-spacer />

			<a class="text--primary" href="/">
				<v-btn elevation="0">
					Home
				</v-btn>
			</a>
		</v-app-bar>
		<v-app-bar class="d-sm-block d-md-none d-lg-none d-xl-none d-block" dense hide-on-scroll>
			<v-app-bar-nav-icon @click="drawer = !drawer" />
			<v-toolbar-title>ExpidusOS</v-toolbar-title>
		</v-app-bar>
		<v-navigation-drawer v-model="drawer" absolute temporary>
			<v-list dense nav>
				<v-list-item link>
					<v-list-item-content>
						<a class="text--primary" href="/">
							<v-btn elevation="0">
								Home
							</v-btn>
						</a>
					</v-list-item-content>
				</v-list-item>
			</v-list>
		</v-navigation-drawer>
		<v-main>
			<Nuxt />
		</v-main>
    <v-footer absolute app>
			<v-card flat tile class="text-center" width="100%">
				<div class="d-inline">
					<v-card-text class="d-inline">
						<a class="text--primary mx-4" href="https://github.com/ExpidusOS">
							<v-btn elevation="0">
								GitHub
							</v-btn>
						</a>
					</v-card-text>

					<v-divider />
		      <v-card-text class="text--primary">
						&copy; {{ new Date().getFullYear() }} - Midstall Software - ExpidusOS is a product of Midstall Software and is licensed under the GNU Public License 3.0
					</v-card-text>
				</div>
			</v-card>
    </v-footer>
  </v-app>
</template>
<script>
export default {
	name: 'DefaultLayout',
	data() {
		return { drawer: false }
	}
}
</script>
