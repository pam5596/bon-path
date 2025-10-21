import BaseRoute from "../_interface";
import { UsersPayloadSchemas } from "@payload";
import { getCookie } from "hono/cookie";
import { GetUserReceiptsUseCase } from "@usecase/users/getUserReceipts";
import { honoJwtLogin } from "@lib/clients";
import { receiptRepository } from "@lib/repositories";

export class GetUserReceiptsRoute extends BaseRoute {
    constructor() {
        super(
            {
                method: 'get',
                path: '/users/receipts',
                tags: ['ユーザー情報をリソースとするルート', 'レシート情報をリソースとするルート'],
                requestMediaType: 'application/json',
                successStatusCode: 200
            },
            async (context) => {
                const loginSessionId = getCookie(context, 'loginSessionId') as string;

                const { isChecked } = new UsersPayloadSchemas.Receipts.GET.Request()
                    .schema().query.parse(context.req.query())

                const request = new UsersPayloadSchemas.Receipts.GET.Request({
                    cookies: { loginSessionId },
                    query: { isChecked }
                })
                const response = await new GetUserReceiptsUseCase(
                    { honoJwt: honoJwtLogin },
                    { receipt: receiptRepository },
                ).execute(request)

                return context.json(response.getBody)
            },
            new UsersPayloadSchemas.Receipts.GET.Request(),
            new UsersPayloadSchemas.Receipts.GET.Response()
        )
    }
}