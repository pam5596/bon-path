import { cors } from "hono/cors";

export const corsHandler = cors({
    origin: [
        'http://localhost:3000',
        process.env.FRONTEND_DOMAIN || ''
    ],
    credentials: true
})