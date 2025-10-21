import { serve } from "@hono/node-server"
import app from "./app"

serve({
    fetch: app.fetch,
    port: Number(process.env.PORT)
},() => {
    console.log(
        `Server is running on http://localhost:${Number(process.env.PORT)}`
    )
})