import '@mdi/font/css/materialdesignicons.css'
import { VFileUpload } from 'vuetify/labs/VFileUpload'

import 'vuetify/styles'
import { createVuetify } from 'vuetify'

export default defineNuxtPlugin((app) => {
    const vuetify = createVuetify({
        components: {
            VFileUpload
        },
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
                bgColor: "transparent"
            },
            VListItem: {
                class: 'pa-0',
                style: 'min-height: 0;'
            },
            VTextField: {
                variant: 'solo'
            }
        },
        theme: {
            defaultTheme: 'customAppTheme',
            themes: {
                customAppTheme: {
                    dark: false,
                    colors: {
                        primary: '#897EFF',
                        secondary: '#4EA6FF',
                        success: '#4CAF50',
                        error: '#F44336',
                        info: '#2196F3',
                        warning: '#FFC107',
                    }
                }
            }
        }
    })
    app.vueApp.use(vuetify)
})