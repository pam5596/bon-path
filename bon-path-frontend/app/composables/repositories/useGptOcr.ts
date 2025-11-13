import type { GptOcrPayloads } from "@@/../share/payloads";

export default function() {
    const config = useRuntimeConfig()
    
    const postGptOcr = async (
        payload: GptOcrPayloads.POST.Request
    ) => {
        return await $fetch<GptOcrPayloads.POST.Response['body']>(
            `${config.public.apiBase}/gpt-ocr`, {
                method: 'post',
                body: payload.body,
                credentials: 'include'
            }
        )
    }

    return {
        postGptOcr
    }
}