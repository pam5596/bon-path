import type { SessionPayloads } from "@@/../share/payloads"

export default function () {
    const { postSessionVerify } = useSessionVerify()

    return useAsyncOnEvent(
        async (form: SessionPayloads.Verify.POST.Request['body']) => {
            await postSessionVerify({ body: form })
        }
    )
}