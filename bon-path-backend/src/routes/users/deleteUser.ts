import BaseRoute from "../_interface";
import { UsersPayloadSchemas } from "@payload";
import { getCookie } from "hono/cookie";
import { RouteError } from "@lib/error";
import { ERROR_MESSAGES } from "@lib/constants/errorMessages";
import { DeleteUserUseCase } from "@usecase/index";
import { honoJwtLogin } from "@lib/clients";
import { userRepository } from "@lib/repositories";

export class DeleteUserRoute extends BaseRoute {
    constructor() {
        super(
            {
                method: 'delete',
                path: '/users',
                tags: ['ユーザー情報をリソースとするルート'],
                requestMediaType: 'application/json',
                successStatusCode: 204
            },
            async(context) => {
                const loginSessionId = getCookie(context, 'loginSessionId');
                if (!loginSessionId) throw new RouteError(
                    400,
                    ERROR_MESSAGES.route.invalidCookie.detail,
                    ERROR_MESSAGES.route.invalidCookie.issue,
                    this.constructor.name,
                    '/users',
                    'DELETE',
                    getCookie(context)
                )

                const request = new UsersPayloadSchemas.DELETE.Request({
                    cookies: { loginSessionId }
                })
                await new DeleteUserUseCase(
                    { honoJwt: honoJwtLogin },
                    { user: userRepository },
                    request
                ).execute()
            },
            new UsersPayloadSchemas.DELETE.Request()
        )
    }
}