import type { VAlert } from "vuetify/components"
import { FetchError } from 'ofetch'

export default function (
    event: () => Promise<void>,
    successMessage?: {
        title: VAlert['title'],
        text: VAlert['text']
    }
) {
    const { overlayIsOpen } = useLoading()
    const { onAlert } = useAlert()

    return async () => {
        overlayIsOpen.value = true
        try {
            await event()
            if (successMessage) onAlert({
                type: 'success',
                ...successMessage
            })
        } catch (e) {
            if (e instanceof FetchError) {
                onAlert({
                    type: 'error',
                    title: e.data?.detail || '不明なエラーが発生しました。',
                    text: e.data?.issue || e.data,
                    forDeveloper: typeof e.data == 'object' ? e.data : undefined
                })
            }
        } finally {
            overlayIsOpen.value = false
        }
    }
}