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
                const verifySessionId = getCookie(context, 'verifySessionId') as string;

                const request = new UsersPayloadSchemas.POST.Request({
                    cookies: { verifySessionId }
                });
                
                const response = await new CreateUserUseCase(
                    { honoJwt: honoJwtVerify },
                    { user: userRepository },
                ).execute(request);

                return context.json(response.getBody, 201)
            },
            new  UsersPayloadSchemas.POST.Request(),
            new  UsersPayloadSchemas.POST.Response()
        )
    }
}