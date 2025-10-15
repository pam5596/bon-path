import { getCookie } from "hono/cookie";
import BaseRoute from "../_interface";
import { ERROR_MESSAGES } from "@lib/constants/errorMessages";
import { ReceiptsPayloadSchemas } from "@payload";
import { GetReceiptImagesUsecase } from "@usecase/index";
import { honoJwtLogin } from "@lib/clients";
import { receiptImageRepository } from "@lib/repositories";

export class GetReceiptImagesRoute extends BaseRoute {
    constructor(){
        super(
            {
                method: 'get',
                path: '/receipts/:receiptId/images',
                tags: ['レシート情報をリソースとするルート', 'レシート画像をリソースとするルート'],
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

                const request = new ReceiptsPayloadSchemas.Images.GET.Request({
                    cookies: { loginSessionId },
                    params: { receiptId: Number(receiptId) }
                })

                const response = await new GetReceiptImagesUsecase(
                    { honoJwt: honoJwtLogin },
                    { receiptImage: receiptImageRepository }
                ).execute(request)

                return context.json(response.getBody)
            },
            new ReceiptsPayloadSchemas.Images.GET.Request(),
            new ReceiptsPayloadSchemas.Images.GET.Response()
        )
    }
}