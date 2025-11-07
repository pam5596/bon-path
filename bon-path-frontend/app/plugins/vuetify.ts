import '@mdi/font/css/materialdesignicons.css'

import 'vuetify/styles'
import { createVuetify } from 'vuetify'

export default defineNuxtPlugin((app) => {
    const vuetify = createVuetify({
        defaults: {
            VCardTitle: {
                class: 'pa-0'
            },
            VCardSubtitle: {
                class: 'pa-0'
            },
            VCardItem: {
                style: 'padding: 0.5rem;'
            },
            VCardText: {
                class: 'pa-0'
            },
            VCardActions: {
                class: 'pa-0',
                style: 'min-height: auto;'
            },
            VParallax: {
                scale: 1,
                style: 'height: 30vh'
            },
            VList: {
                class: 'pa-0',
            },
            VListItem: {
                class: 'pa-0',
            }
        }
    })
    app.vueApp.use(vuetify)
})