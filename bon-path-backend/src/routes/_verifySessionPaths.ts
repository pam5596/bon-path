import { RouteConfig } from "@hono/zod-openapi";
import { PathsEnum } from "./enums";

export const verifySessionPaths: {
    path: PathsEnum,
    method: RouteConfig['method']
}[] = [
    {
        path: '/session/verify',
        method: 'get'
    },
    {
        path: '/users',
        method: 'post'
    },
    {
        path: '/session/verify',
        method: 'delete'
    },
]