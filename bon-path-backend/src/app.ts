import { OpenAPIHono } from '@hono/zod-openapi'
import { swaggerUI } from "@hono/swagger-ui";
import { serve } from '@hono/node-server'
import { corsHandler, errorHandler } from '@lib/middleware';

import { 
    getLoginSession,
    createLoginSession,
    deleteLoginSession
} from '@routes';

const app = new OpenAPIHono()

app.use('/*', corsHandler)
app.onError(errorHandler)

app.get('/signup', (c) => c.text('Redirect test: /signup'))
app.get('/login', (c) => c.text('Redirect test: /login'))

app.openapi(getLoginSession.route, getLoginSession.handler)
app.openapi(createLoginSession.route, createLoginSession.handler)
app.openapi(deleteLoginSession.route, deleteLoginSession.handler)

app.doc('/doc', {
    openapi: '3.0.0',
    info: {
        version: '1.0.0',
        title: 'BonPathAPI',
    },
})
app.get("/docs", swaggerUI({ url: "/doc" }))

serve({
    fetch: app.fetch,
    port: 8080,
},() => {
    console.log('Server is running on http://localhost:8080')
})

export default app