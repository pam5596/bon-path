import BaseRoute from "../_interface";
import { SessionPayloadSchemas } from "@payload";
import { deleteCookie } from "hono/cookie";

export class DeleteLoginSessionRoute extends BaseRoute {
    constructor() {
        super(
            {
                method: 'delete',
                path: '/session/login',
                tags: ['ログインセッションをリソースとするルート'],
                requestMediaType: 'application/json',
                successStatusCode: 204
            },
            (context) => {
                deleteCookie(context, 'loginSessionId')
                return context.body(null, 204)
            },
            new SessionPayloadSchemas.Login.DELETE.Request(),
        )
    }
}