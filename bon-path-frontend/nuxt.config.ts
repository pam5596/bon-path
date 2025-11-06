// https://nuxt.com/docs/api/configuration/nuxt-config
import { fileURLToPath } from 'node:url';
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
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
    (_options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) => {
        // @ts-expect-error - vite config typing mismatch: config.plugins is not typed as extensible here
        config.plugins.push(vuetify({ autoImport: true }))
      })
    },
  ],
  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },
  alias: {
    '@share/*': fileURLToPath(new URL('../share/*', import.meta.url)),
    '@models': fileURLToPath(new URL('./src/models', import.meta.url)),
  },

  routeRules: {
    '/api/**' : {
      cors: true,
      proxy: { to: `${process.env.BACKEND_DOMAIN}/**`}
    },
    '/source/**' : {
      cors: true,
      proxy: { to: `${process.env.STORAGE_DOMAIN}/**`}
    }
  }
})