import BaseRoute from "../_interface";
import { ERROR_MESSAGES } from "@lib/constants/errorMessages";
import { StoresPayloadSchemas } from "@payload";
import { DeleteStoreUseCase } from "@usecase/index";
import { storeRepository } from "@lib/repositories";

export class DeleteStoreRoute extends BaseRoute {
    constructor() {
        super(
            {
                method: 'delete',
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

                const request = new StoresPayloadSchemas.DELETE.Request({
                    params: { id: Number(id) }
                });

                await new DeleteStoreUseCase(
                    { store: storeRepository }
                ).execute(request)
            },
            new StoresPayloadSchemas.DELETE.Request()
        )
    }
}