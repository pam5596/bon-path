import BaseRoute from "../_interface";
import { UsersPayloadSchemas } from "@payload";
import { getCookie } from "hono/cookie";
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
                const loginSessionId = getCookie(context, 'loginSessionid') as string;
                
                const request = new UsersPayloadSchemas.GET.Request({
                    cookies: { loginSessionId }
                })

                const response = await new GetUserUseCase(
                    { honoJwt: honoJwtLogin },
                    { user: userRepository },
                ).execute(request)

                return context.json(response.getBody)
            },
            new UsersPayloadSchemas.GET.Request(),
            new UsersPayloadSchemas.GET.Response()
        )
    }
}