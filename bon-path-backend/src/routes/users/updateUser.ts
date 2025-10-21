import BaseRoute from "../_interface";
import { UsersPayloadSchemas } from "@payload";
import { getCookie } from "hono/cookie";
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
                const loginSessionId = getCookie(context, 'loginSessionId') as string;

                const request = new UsersPayloadSchemas.PATCH.Request({
                    cookies: { loginSessionId },
                    body
                })

                await new UpdateUserUseCase(
                    { honoJwt: honoJwtLogin },
                    { user: userRepository },
                    { userPasswordHash: userPasswordHashService },
                ).execute(request)

                return context.body(null, 204)
            },
            new UsersPayloadSchemas.PATCH.Request()
        )
    }
}