import BaseRoute from "../_interface";
import { UsersPayloadSchemas } from "@payload";
import { getCookie } from "hono/cookie";
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
                if (!loginSessionId) throw this.createError(
                    ERROR_MESSAGES.route.invalidCookie,
                    getCookie(context)
                )

                const request = new UsersPayloadSchemas.DELETE.Request({
                    cookies: { loginSessionId }
                })
                await new DeleteUserUseCase(
                    { honoJwt: honoJwtLogin },
                    { user: userRepository },
                ).execute(request)
            },
            new UsersPayloadSchemas.DELETE.Request()
        )
    }
}