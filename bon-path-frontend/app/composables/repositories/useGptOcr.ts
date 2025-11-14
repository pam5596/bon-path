import type { GptOcrPayloads } from "@@/../share/payloads";

export default function() {
    const fetcher = useFetcher()
    
    const postGptOcr = async (
        payload: GptOcrPayloads.POST.Request
    ) => {
        return await fetcher<GptOcrPayloads.POST.Response['body']>(
            `/gpt-ocr`, {
                method: 'post',
                body: payload.body,
            }
        )
    }

    return {
        postGptOcr
    }
}