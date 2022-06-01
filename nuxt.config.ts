import { mdiHome, mdiDownload } from '@mdi/js'
import { defineNuxtConfig } from 'nuxt'

export default defineNuxtConfig({
  modules: ['@midstallsoftware/vista'],
  meta: {
    link: [{ rel: 'icon', type: 'image/png', href: '/favicon.png' }],
  },
  vista: {
    branding: {
      kind: 'product',
      license: 'GPL-3.0',
    },
    layouts: {
      default: {
        links: [
          {
            url: '/',
            title: { key: 'page.home' },
            icon: mdiHome,
            side: ['default', 'default'],
          },
          {
            url: '/download',
            title: { key: 'page.download' },
            side: ['default', 'default'],
            icon: mdiDownload,
          },
        ],
      },
    },
  },
  nitro: {
    preset: 'cloudflare',
  },
  intlify: {
    vueI18n: {
      locale: 'en',
      fallbackRoot: true,
      messages: {
        en: {
          product: {
            name: 'ExpidusOS',
          },
          page: {
            home: 'Home',
            download: 'Download',
          },
        },
      },
    },
  },
})
