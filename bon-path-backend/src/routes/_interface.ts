import { createRoute, RouteConfig } from "@hono/zod-openapi"
import { Handler } from "hono"
import BasePayload from "../payloads/_abstruct"
import { ROUTE_DESCRIPTIONS } from "@lib/constants/routeDescriptions"
import type { PathsEnum, TagsEnum } from "@lib/enums"
import { RouteError } from "@lib/error"

type PartOfRouteConfig = {
    method: RouteConfig['method'],
    path: PathsEnum,
    tags: TagsEnum[],
    requestMediaType: 'application/json' | 'multipart/form-data',
    successStatusCode: keyof RouteConfig['responses']
}

export default abstract class BaseRoute {
    public route: RouteConfig;

    constructor(
        config: PartOfRouteConfig,
        public handler: Handler,
        request: BasePayload<any>,
        response?: BasePayload<any>,
    ){
        this.route = createRoute({
            ...config,
            request: {
                ...request.schema(),
                body: request.schema().body
                    ? {
                        content: {
                            [config.requestMediaType]: {
                                schema: request.schema().body!
                            }
                        }
                    } : undefined
            },
            responses: {
                [config.successStatusCode]: {
                    content: response?.schema().body ? {
                        'application/json': {
                            schema: response.schema().body!
                        }
                    } : undefined,
                    description: ROUTE_DESCRIPTIONS[(this.routeName()) as keyof typeof ROUTE_DESCRIPTIONS]
                }
            }
        })
    }

    private routeName() {
        const name = this.constructor.name
        return name.charAt(0).toLowerCase() + name.slice(1).replace('Route', '')
    }

    protected createError(
        messages: { detail: string, issue: string }, 
        report?: any
    ) {
        return new RouteError(
            400,
            messages.detail,
            messages.issue,
            this.constructor.name,
            this.route.path as PathsEnum,
            this.route.method,
            report
        )
    }
}