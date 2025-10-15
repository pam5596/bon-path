import BaseRoute from "../_interface";
import { UsersPayloadSchemas } from "@payload";
import { getCookie } from "hono/cookie";
import { ERROR_MESSAGES } from "@lib/constants/errorMessages";
import { UpdateUserUseCase } from "@usecase/index";
import { honoJwtLogin } from "@lib/clients";
import { userPasswordHashService } from "@lib/services";
import { userRepository } from "@lib/repositories";

export class UpdateUserRoute extends BaseRoute {
    constructor() {
        super(
            {
                method: 'patch',
                path: '/users',
                tags: ['ユーザー情報をリソースとするルート'],
                requestMediaType: 'application/json',
                successStatusCode: 204
            },
            async (context) => {
                const body = await context.req.json()
                const loginSessionId = getCookie(context, 'loginSessionId');

                if (!loginSessionId) throw this.createError(
                    ERROR_MESSAGES.route.invalidCookie,
                    getCookie(context)
                )

                const request = new UsersPayloadSchemas.PATCH.Request({
                    cookies: { loginSessionId },
                    body
                })

                await new UpdateUserUseCase(
                    { honoJwt: honoJwtLogin },
                    { user: userRepository },
                    { userPasswordHash: userPasswordHashService },
                    request
                ).execute()
            },
            new UsersPayloadSchemas.PATCH.Request()
        )
    }
}