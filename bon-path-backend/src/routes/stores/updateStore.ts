import BaseRoute from "../_interface";
import { ERROR_MESSAGES } from "@lib/constants/errorMessages";
import { StoresPayloadSchemas } from "@payload";
import { UpdateStoreUseCase } from "@usecase/index";
import { honoJwtLogin } from "@lib/clients";
import { storeRepository } from "@lib/repositories";

export class UpdateStoreRoute extends BaseRoute {
    constructor() {
        super(
            {
                method: 'patch',
                path: '/stores/:id',
                tags: ['店舗情報をリソースとするルート'],
                requestMediaType: 'application/json',
                successStatusCode: 204
            },
            async (context) => {
                const { id } = context.req.param()
                if (isNaN(Number(id))) throw this.createError(
                    ERROR_MESSAGES.route.invalidParams,
                    context.req.param()
                )

                const body = await context.req.json()

                const request = new StoresPayloadSchemas.PATCH.Request({
                    params: { id: Number(id) },
                    body
                })

                await new UpdateStoreUseCase(
                    { honoJwt: honoJwtLogin },
                    { store: storeRepository }
                ).execute(request)
            },
            new StoresPayloadSchemas.PATCH.Request()
        )
    }
}