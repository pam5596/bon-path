// https://nuxt.com/docs/api/configuration/nuxt-config
import { fileURLToPath } from 'node:url';

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  modules: [
    '@nuxt/test-utils/module',
    '@nuxt/icon',
    '@nuxt/fonts',
    '@nuxt/eslint',
    '@nuxt/image'
  ],

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