// https://nuxt.com/docs/api/configuration/nuxt-config
import { fileURLToPath } from 'node:url';
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'

export default defineNuxtConfig({
  app: {
    head: {
      title: 'BON PATH',
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.svg' },
      ]
    }
  },
  nitro: {
    preset: 'static',
  },
  compatibilityDate: '2025-07-15',
  ssr: false,
  devtools: { enabled: true },
  build: {
    transpile: ['vuetify']
  },
  imports: {
    dirs: [
      '~/composables/**',
      '~/models/**',
      '~/valueObjects/**'
    ]
  },
  modules: [
    '@nuxt/test-utils/module',
    '@nuxt/icon',
    '@nuxt/fonts',
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxtjs/i18n',
    (_options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) => {
        // @ts-expect-error - vite config typing mismatch: config.plugins is not typed as extensible here
        config.plugins.push(vuetify({ autoImport: true }))
      })
    },
  ],
  css: ['~/assets/global.css'],
  fonts: {
    families: [
      {
        name: 'Julius Sans One',
        src: '~/assets/JuliusSansOne-Regular.ttf'
      }
    ]
  },
  i18n: {
    locales: [
      { code: 'ja', name: '日本語', file: 'ja.json' }
    ],
    defaultLocale: 'ja',
    langDir: 'locales/'
  },
  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },
  alias: {
    '@models': fileURLToPath(new URL('./src/models', import.meta.url))
  },
  
  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_BACKEND_DOMAIN,
      sourceBase: process.env.NUXT_PUBLIC_STORAGE_DOMAIN,
      alertKeepTime: 10000,
      defaultLimitOfSearch: 10,
    }
  }
})