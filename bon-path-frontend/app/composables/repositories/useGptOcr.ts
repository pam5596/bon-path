import type { GptOcrPayloads } from "@share/payloads";

export default async function() {
    const postGptOcr = async (
        payload: GptOcrPayloads.POST.Request
    ) => {
        return await $fetch<GptOcrPayloads.POST.Response['body']>(
            `/api/gpt-ocr`, {
                method: 'post',
                body: payload.body
            }
        )
    }

    return {
        postGptOcr
    }
}