import BaseRoute from "../_interface";
import { StoresPayloadSchemas } from "@payload";
import { GetStoresUseCase } from "@usecase/index";
import { storeRepository } from "@lib/repositories";
import { ERROR_MESSAGES } from "@lib/constants/errorMessages";

export class GetStoresRoute extends BaseRoute {
    constructor() {
        super(
            {
                method: 'get',
                path: '/stores',
                tags: ['店舗情報をリソースとするルート'],
                requestMediaType: 'application/json',
                successStatusCode: 200
            },
            async (context) => {
                const query = new StoresPayloadSchemas.Stores.GET.Request()
                    .schema().query.safeParse(context.req.query());
                if (!query.success) throw this.createError(
                    ERROR_MESSAGES.route.invalidQuery,
                    query
                )

                const request = new StoresPayloadSchemas.Stores.GET.Request({
                    query: query.data
                })

                const response = await new GetStoresUseCase(
                    { store: storeRepository }
                ).execute(request)

                return context.json(response.getBody)
            },
            new StoresPayloadSchemas.Stores.GET.Request(),
            new StoresPayloadSchemas.Stores.GET.Response()
        )
    }
}