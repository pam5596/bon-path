import { RouteConfig } from "@hono/zod-openapi"
import { Handler } from "hono"

export default interface BaseRoute {
    route: RouteConfig
    handler: Handler
}