import BaseRoute from "../_interface";
import { SessionPayloadSchemas } from "@payload";
import { deleteCookie } from "hono/cookie";

export class DeleteVerifySessionRoute extends BaseRoute {
    constructor() {
        super(
            {
                method: 'delete',
                path: '/session/verify',
                tags: ['メアド確認用セッションをリソースとするルート'],
                requestMediaType: 'application/json',
                successStatusCode: 204
            },
            (context) => {
                deleteCookie(context, 'verifySessionId')
                return context.body(null, 204)
            },
            new SessionPayloadSchemas.Verify.DELETE.Request(),
        )
    }
}