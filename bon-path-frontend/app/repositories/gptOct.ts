import type { GptOcrPayloads } from "@share/payloads";

export class GptOctRepository {
    async post(payload: GptOcrPayloads.POST.Request) {
        return await useAPIFetch<GptOcrPayloads.POST.Response['body']>(
            `/gpt-ocr`, {
                method: 'post',
                body: payload.body
            }
        )
    }
}