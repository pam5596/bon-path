import { GptOcrPayloadSchemas } from "@payload";
import BaseRoute from "./_interface";
import { GptOcrUseCase } from "@usecase/gptOcr";
import { receiptOcrService } from "@lib/services";

export class GptOcrRoute extends BaseRoute {
    constructor() {
        super(
            {
                method: 'post',
                path: '/gpt-ocr',
                tags: ['ChatGPTのOCR分析ルート'],
                requestMediaType: 'application/json',
                successStatusCode: 200
            },
            async(context) => {
                const body = await context.req.json()

                const request = new GptOcrPayloadSchemas.POST.Request({body})

                const response = await new GptOcrUseCase(
                    { receiptOcr: receiptOcrService }
                ).execute(request)

                return context.json(response.getBody)
            },
            new GptOcrPayloadSchemas.POST.Request(),
            new GptOcrPayloadSchemas.POST.Response()
        )
    }
}