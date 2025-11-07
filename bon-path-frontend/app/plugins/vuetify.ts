import '@mdi/font/css/materialdesignicons.css'

import 'vuetify/styles'
import { createVuetify } from 'vuetify'

export default defineNuxtPlugin((app) => {
    const vuetify = createVuetify({
        defaults: {
            VCardItem: {
                style: 'padding: 0.5rem;'
            },
            VCardActions: {
                class: 'pa-0',
                style: 'min-height: auto;'
            },
            VParallax: {
                scale: 1
            }
        }
    })
    app.vueApp.use(vuetify)
})