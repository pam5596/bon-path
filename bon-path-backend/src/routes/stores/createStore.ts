import BaseRoute from "../_interface";
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
                const body = await context.req.json()
                
                const request = new StoresPayloadSchemas.POST.Request({
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