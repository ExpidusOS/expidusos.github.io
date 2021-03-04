import { Tokyonight, Tokyoday } from '@expidus/common/colors'

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: 'ExpidusOS Account - %s',
    title: 'ExpidusOS Account',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

	router: {
		middleware: ['auth']
	},

	auth: {
		strategies: {
			local: {
				scheme: 'oauth2',
				endpoints: {
					authorization: 'https://api.expidusos.com/v1/user/auth',
					token: 'https://api.expidusos.com/v1/user/token',
					userInfo: 'https://api.expidusos.com/v1/user/info'
				},
				responseMode: 'query.jwt',
				accessType: 'offline',
				clientId: '0',
				clientSecret: '0',
				responseType: 'code',
				grantType: 'password',
				scope: ['profile', 'profile:edit']
			}
		}
	},

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/stylelint
    '@nuxtjs/stylelint-module',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
		'@nuxtjs/auth-next',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa'
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
		baseURL: 'https://api.expidusos.com/v1/'
	},

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en'
    }
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: true,
      themes: {
				light: Tokyoday,
        dark: Tokyonight
      }
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },

	server: {
		port: 3000,
		host: '0.0.0.0'
	}
}
