import { getCookie } from "hono/cookie";
import BaseRoute from "../_interface";
import { ERROR_MESSAGES } from "@lib/constants/errorMessages";
import { StoresPayloadSchemas } from "@payload";
import { CreateStoreUseCase } from "@usecase/index";
import { honoJwtLogin } from "@lib/clients";
import { storeRepository } from "@lib/repositories";

export class CreateStoreRoute extends BaseRoute {
    constructor() {
        super(
            {
                method: 'post',
                path: '/stores',
                tags: ['店舗情報をリソースとするルート'],
                requestMediaType: 'application/json',
                successStatusCode: 201
            },
            async (context) => {
                const loginSessionId = getCookie(context, 'loginSessionid');
                if (!loginSessionId) throw this.createError(
                    ERROR_MESSAGES.route.invalidCookie,
                    getCookie(context)
                )

                const body = await context.req.json()
                const request = new StoresPayloadSchemas.POST.Request({
                    cookies: { loginSessionId },
                    body
                });

                const response = await new CreateStoreUseCase(
                    { honoJwt: honoJwtLogin },
                    { store: storeRepository }
                ).execute(request)

                return context.json(response.getBody)
            },
            new StoresPayloadSchemas.POST.Request(),
            new StoresPayloadSchemas.POST.Response()
        )
    }
}