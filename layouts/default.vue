<template>
  <v-app dark>
		<v-app-bar class="d-md-block d-lg-block d-xl-block d-none" dense elevate-on-scroll fixed elevation="3">
			<v-toolbar-title>{{ $t('product-name') }}</v-toolbar-title>
			<v-spacer />

			<a class="text--primary" href="/">
				<v-btn elevation="0">
					{{ $t('page.home') }}
				</v-btn>
			</a>

			<a class="text--primary" href="/download">
				<v-btn elevation="0">
					{{ $t('page.download') }}
				</v-btn>
			</a>

			<a class="text--primary" href="/manual/0.1.1-prealpha?lang=en">
				<v-btn elevation="0">
					{{ $t('page.manual') }}
				</v-btn>
			</a>

			<v-menu open-on-hover offset-y>
				<template v-slot:activator="{ on, attrs }">
					<v-btn v-bind="attrs" v-on="on">
						<span><fa :icon="['fas', 'language']" /> {{ $i18n.locales.filter(i => i.code == $i18n.locale)[0].name }}</span>
					</v-btn>
				</template>
				<v-list>
					<v-list-item v-for="locale in availableLocales" :key="locale.code">
						<nuxt-link :to="switchLocalePath(locale.code)" class="text--primary">{{ locale.name }}</nuxt-link>
					</v-list-item>
				</v-list>
			</v-menu>
		</v-app-bar>
		<v-app-bar class="d-sm-block d-md-none d-lg-none d-xl-none d-block" dense elevate-on-scroll fixed elevation="3">
			<v-app-bar-nav-icon @click="drawer = !drawer">
				<fa :icon="['fas', 'bars']" />
			</v-app-bar-nav-icon>
			<v-toolbar-title>{{ $t('product-name') }}</v-toolbar-title>
		</v-app-bar>
		<v-navigation-drawer v-model="drawer" absolute temporary>
			<v-list dense nav>
				<v-list-item link>
					<v-list-item-content>
						<a class="text--primary" href="/">
							<v-btn elevation="0">
								{{ $t('page.home') }}
							</v-btn>
						</a>
					</v-list-item-content>
				</v-list-item>
				<v-list-item link>
					<v-list-item-content>
						<a class="text--primary" href="/download">
							<v-btn elevation="0">
								{{ $t('page.download') }}
							</v-btn>
						</a>
					</v-list-item-content>
				</v-list-item>
				<v-list-item link>
					<v-list-item-content>
						<a class="text--primary" href="/manual">
							<v-btn elevation="0">
								{{ $t('page.manual') }}
							</v-btn>
						</a>
					</v-list-item-content>
				</v-list-item>
			</v-list>

			<template v-slot:prepend>
				<div class="pa-2">
					<v-menu top>
						<template v-slot:activator="{ on, attrs }">
							<v-btn v-bind="attrs" v-on="on">
								<span><fa :icon="['fas', 'language']" /> {{ $i18n.locales.filter(i => i.code == $i18n.locale)[0].name }}</span>
							</v-btn>
						</template>
						<v-list>
							<v-list-item v-for="locale in availableLocales" :key="locale.code">
								<nuxt-link :to="switchLocalePath(locale.code)" class="text--primary">{{ locale.name }}</nuxt-link>
							</v-list-item>
						</v-list>
					</v-menu>
				</div>
			</template>
		</v-navigation-drawer>
		<v-main>
			<div class="main-container">
				<Nuxt />
			</div>
		</v-main>
    <v-footer absolute app>
			<v-card flat tile width="100%" class="text-center">
				<p>
					<v-card-text v-for="(link, index) in footerLinks" :key="index" class="d-inline">
						<a :href="link.href" class="text--primary mx-4">
							<v-btn elevation="0">
								{{ link.title }}
							</v-btn>
						</a>
					</v-card-text>
				</p>
				<p>
					<v-card-text v-for="(social, index) in socials" :key="index" class="d-inline">
						<v-tooltip bottom>
							<template v-slot:activator="{ on, attrs }">
								<a :href="social.href" class="text--primary mx-4">
									<v-btn elevation="0" icon v-bind="attrs" v-on="on">
										<fa :icon="['fab', social.icon]" />
									</v-btn>
								</a>
							</template>
							<span>{{ social.title }}</span>
						</v-tooltip>
					</v-card-text>
				</p>
				<v-divider />
				<v-card-text class="text--primary">
					&copy; {{ new Date().getFullYear() }} - {{ $t('footer') }}
				</v-card-text>
			</v-card>
    </v-footer>
  </v-app>
</template>
<i18n>
{
	"en": {
		"product-name": "ExpidusOS",
		"page.home": "Home",
		"page.download": "Download",
		"page.manual": "Manual",
		"footer": "ExpidusOS is a product of Midstall Software and is licensed under the GNU Public License 3.0."
	}
}
</i18n>
<script>
export default {
	name: 'LayoutDefault',
	computed: {
		availableLocales() {
			return this.$i18n.locales
		}
	},
	data() {
		return {
			drawer: false,
			footerLinks: [
				{ href: '/', title: 'Home' },
				{ href: 'https://midstall.com', title: 'Midstall Software' }
			],
			socials: [
				{ icon: 'discord', href: 'https://discord.com/invite/GVfBF2w', title: 'Server Invite' },
				{ icon: 'github', href: 'https://github.com/ExpidusOS', title: '@ExpidusOS' },
				{ icon: 'patreon', href: 'https://patreon.com/MidstallSoftware', title: '/MidstallSoftware' },
				{ icon: 'reddit', href: 'https://reddit.com/r/ExpidusOS', title: '/r/ExpidusOS' },
				{ icon: 'twitter', href: 'https://twitter.com/ExpidusOS', title: '@ExpidusOS' }
			].sort((a, b) => a.title.localeCompare(b.title))
		}
	}
}
</script>
<style>
div.main-container {
	padding-top: 65px;
	padding-bottom: 65px;
	padding-left: 15px;
	padding-right: 15px;
}
</style>
