import { OpenAPIHono } from '@hono/zod-openapi'
import { swaggerUI } from "@hono/swagger-ui";
import { serve } from '@hono/node-server'

const app = new OpenAPIHono()

app.get('/', (c) => {
    return c.text('Hello Hono!')
})

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