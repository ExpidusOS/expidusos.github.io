export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head() {
		const i18nHead = this.$nuxtI18nHead({ addSeoAttributes: true })
		return {
	    titleTemplate: '%s - ExpidusOS',
	    title: 'ExpidusOS',
	    meta: [
	      { charset: 'utf-8' },
	      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
	      { hid: 'description', name: 'description', content: '' },
	      { name: 'format-detection', content: 'telephone=no' },
				...i18nHead.meta
	    ],
	    link: [
	      { rel: 'icon', type: 'image/x-icon', href: '/favicon.png' },
				...i18nHead.link
	    ]
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
		'@nuxtjs/fontawesome',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
  ],

	i18n: {
		baseUrl: 'https://expidusos.com',
		locales: [
			{
				code: 'en',
				iso: 'en-US',
				name: 'English'
			}
		],
		defaultLocale: 'en',
		vueI18nLoader: true,
		detectBrowserLanguage: {
			useCookie: true,
			cookieKey: 'i18n_redirected',
			redirectOn: 'root'
		},
		vueI18n: {
			fallbackLocale: 'en',
			messages: {
				en: {
				}
			}
		}
	},

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
		'~/modules/manual.js',
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
		'@nuxt/content',
		'@nuxtjs/i18n'
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
			name: 'ExpidusOS',
			short_name: 'ExpidusOS',
      lang: 'en'
    }
  },

	fontawesome: {
		component: 'fa',
		icons: {
			solid: ['faSmile', 'faBars', 'faLanguage'],
			brands: ['faGithub', 'faTwitter', 'faPatreon', 'faReddit', 'faDiscord']
		}
	},

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
		treeShake: true,
		icons: {
			iconfont: 'faSvg'
		},
    theme: {
      dark: true,
      themes: {
        dark: {
          accent: '#414868',
          primary: '#ffffff',
          secondary: '#cfc9c2',
          info: '#b4f9f8',
          warning: '#e0af68',
          error: '#ff9e64',
          success: '#9ece6a'
        },
        light: {
          primary: '#d5d6db',
          accent: '#0f0f14',
          secondary: '#0f0f14',
          info: '#33635c',
          warning: '#8f5e15',
          error: '#965027',
          success: '#485e30'
        }
      }
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
