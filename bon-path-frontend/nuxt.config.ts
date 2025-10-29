// https://nuxt.com/docs/api/configuration/nuxt-config
import { fileURLToPath } from 'node:url';
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  build: {
    transpile: ['vuetify']
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
    '@models': fileURLToPath(new URL('./models', import.meta.url))
  },
})