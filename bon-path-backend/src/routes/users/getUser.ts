import BaseRoute from "../_interface";
import { UsersPayloadSchemas } from "@payload";
import { getCookie } from "hono/cookie";
import { ERROR_MESSAGES } from "@lib/constants/errorMessages";
import { GetUserUseCase } from "@usecase/index";
import { honoJwtLogin } from "@lib/clients";
import { userRepository } from "@lib/repositories";

export class GetUserRoute extends BaseRoute {
    constructor() {
        super(
            {
                method: 'get',
                path: '/users',
                tags: ['ユーザー情報をリソースとするルート'],
                requestMediaType: 'application/json',
                successStatusCode: 200
            },
            async (context) => {
                const loginSessionId = getCookie(context, 'loginSessionid');
                if (!loginSessionId) throw this.createError(
                    ERROR_MESSAGES.route.invalidCookie,
                    getCookie(context)
                )

                const request = new UsersPayloadSchemas.GET.Request({
                    cookies: { loginSessionId }
                })
                const response = await new GetUserUseCase(
                    { honoJwt: honoJwtLogin },
                    { user: userRepository },
                    request
                ).execute()

                return context.json(response.getBody)
            },
            new UsersPayloadSchemas.GET.Request(),
            new UsersPayloadSchemas.GET.Response()
        )
    }
}