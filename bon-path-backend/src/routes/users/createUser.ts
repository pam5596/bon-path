import BaseRoute from "../_interface";
import { UsersPayloadSchemas } from "@payload";
import { UserPayloads } from "@share/payloads";
import { getCookie } from "hono/cookie";
import { CreateUserUseCase } from "@usecase/index";
import { honoJwtVerify } from "@lib/clients";
import { userRepository } from "@lib/repositories";
import { userPasswordHashService } from "@lib/services";

export class CreateUserRoute extends BaseRoute {    
    constructor() {
        super(
            {
                method: 'post',
                path: '/users',
                tags: ['ユーザー情報をリソースとするルート'],
                requestMediaType: 'application/json',
                successStatusCode: 201
            },
            async (context) => {
                const body = await context.req.json() as UserPayloads.POST.Request['body']
                const verifySessionId = getCookie(context, 'loginSessionId') as string;

                const request = new UsersPayloadSchemas.POST.Request({
                    cookies: { verifySessionId }, body
                });
                
                const response = await new CreateUserUseCase(
                    { honoJwt: honoJwtVerify },
                    { user: userRepository },
                    { userPasswordHashService },
                ).execute(request);

                return context.json(response.getBody)
            },
            new  UsersPayloadSchemas.POST.Request(),
            new  UsersPayloadSchemas.POST.Response()
        )
    }
}