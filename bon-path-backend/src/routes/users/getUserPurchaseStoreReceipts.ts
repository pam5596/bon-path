import { honoJwtLogin } from "@lib/clients";
import { ERROR_MESSAGES } from "@lib/constants/errorMessages";
import { receiptRepository } from "@lib/repositories";
import { UsersPayloadSchemas } from "@payload";
import BaseRoute from "@routes/_interface";
import { GetUserPurchasesStoreReceiptsUseCase } from "@usecase/index";
import { getCookie } from "hono/cookie";

export class GetUserPurchasesStoreReceiptsRoute extends BaseRoute {
    constructor() {
        super(
            {
                method: 'get',
                path: '/users/purchases/stores/:storeId/receipts',
                tags: [
                    'ユーザー情報をリソースとするルート',
                    'レシート情報をリソースとするルート',
                    '店舗情報をリソースとするルート',
                    '購入履歴をリソースとするルート'
                ],
                requestMediaType: 'application/json',
                successStatusCode: 200
            },
            async (context) => {
                const loginSessionId = getCookie(context, 'loginSessionId') as string;
                const { storeId } = context.req.param()
                if (isNaN(Number(storeId))) throw this.createError(
                    ERROR_MESSAGES.route.invalidParams,
                    context.req.param()
                )

                const request = new UsersPayloadSchemas.Purchases.Stores.Receipts.GET.Request({
                    cookies: { loginSessionId },
                    params: { storeId: Number(storeId) }
                })

                const response = await new GetUserPurchasesStoreReceiptsUseCase(
                    { honoJwt: honoJwtLogin },
                    { receipt: receiptRepository }
                ).execute(request)

                return context.json(response.getBody)
            },
            new UsersPayloadSchemas.Purchases.Stores.Receipts.GET.Request(),
            new UsersPayloadSchemas.Purchases.Stores.Receipts.GET.Response()
        )
    }
}