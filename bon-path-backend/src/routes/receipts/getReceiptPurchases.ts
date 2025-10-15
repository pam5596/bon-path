import { getCookie } from "hono/cookie";
import BaseRoute from "../_interface";
import { ERROR_MESSAGES } from "@lib/constants/errorMessages";
import { ReceiptsPayloadSchemas } from "@payload";
import { GetReceiptPurchasesUsecase } from "@usecase/index";
import { honoJwtLogin } from "@lib/clients";
import { purchaseRepository } from "@lib/repositories";

export class GetReceiptPurchasesRoute extends BaseRoute {
    constructor() {
        super(
            {
                method: 'get',
                path: '/receipts/:receiptId/purchases',
                tags: ['レシート情報をリソースとするルート', '購入履歴をリソースとするルート'],
                requestMediaType: 'application/json',
                successStatusCode: 200
            },
            async (context) => {
                const loginSessionId = getCookie(context, 'loginSessionid');
                if (!loginSessionId) throw this.createError(
                    ERROR_MESSAGES.route.invalidCookie,
                    getCookie(context)
                )

                const { receiptId } = context.req.param()
                if (isNaN(Number(receiptId))) throw this.createError(
                    ERROR_MESSAGES.route.invalidParams,
                    context.req.param()
                )

                const request = new ReceiptsPayloadSchemas.Purchases.GET.Request({
                    cookies: { loginSessionId },
                    params: { receiptId: Number(receiptId) }
                })

                const response = await new GetReceiptPurchasesUsecase(
                    { honoJwt: honoJwtLogin },
                    { purchase: purchaseRepository }
                ).execute(request)

                return context.json(response.getBody)
            },
            new ReceiptsPayloadSchemas.Purchases.GET.Request(),
            new ReceiptsPayloadSchemas.Purchases.GET.Response()
        )
    }
}