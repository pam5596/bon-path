import BaseRoute from "../_interface";
import { ERROR_MESSAGES } from "@lib/constants/errorMessages";
import { StoresPayloadSchemas } from "@payload";
import { GetStoreUseCase } from "@usecase/index";
import { honoJwtLogin } from "@lib/clients";
import { storeRepository } from "@lib/repositories";

export class GetStoreRoute extends BaseRoute {
    constructor() {
        super(
            {
                method: 'get',
                path: '/stores/:id',
                tags: ['店舗情報をリソースとするルート'],
                requestMediaType: 'application/json',
                successStatusCode: 200
            },
            async (context) => {
                const { id } = context.req.param()
                if (isNaN(Number(id))) throw this.createError(
                    ERROR_MESSAGES.route.invalidParams,
                    context.req.param()
                )

                const request = new StoresPayloadSchemas.GET.Request({
                    params: { id: Number(id) }
                })

                const response = await new GetStoreUseCase(
                    { honoJwt: honoJwtLogin },
                    { store: storeRepository }
                ).execute(request)

                return context.json(response.getBody)
            },
            new StoresPayloadSchemas.GET.Request(),
            new StoresPayloadSchemas.GET.Response()
        )
    }
}