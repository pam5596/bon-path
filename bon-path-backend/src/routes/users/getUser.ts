import BaseRoute from "../_interface";
import { UsersPayloadSchemas } from "@payload";
import { getCookie } from "hono/cookie";
import { RouteError } from "@lib/error";
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
                if (!loginSessionId) throw new RouteError(
                    400,
                    ERROR_MESSAGES.route.invalidCookie.detail,
                    ERROR_MESSAGES.route.invalidCookie.issue,
                    this.constructor.name,
                    '/users',
                    'GET',
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