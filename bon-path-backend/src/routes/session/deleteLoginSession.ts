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
                successStatusCode: 302
            },
            (context) => {
                deleteCookie(context, 'loginSessionId')
                return context.redirect(process.env.FRONTEND_DOMAIN + '/signup')
            },
            new SessionPayloadSchemas.Login.DELETE.Request(),
        )
    }
}