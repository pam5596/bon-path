import type { SessionPayloads } from "@@/../share/payloads"

export default function () {
    const { postSessionLogin } = useSessionLogin()

    return useAsyncOnEvent(
        async (form: SessionPayloads.Login.POST.Request['body']) => {
            await postSessionLogin({ body: form })
        }
    )
}