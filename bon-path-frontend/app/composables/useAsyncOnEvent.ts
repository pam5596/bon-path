import type { VAlert } from "vuetify/components"
import { FetchError } from 'ofetch'

export default function <ParamsT>(
    event: (args: ParamsT) => Promise<void>,
    successMessage?: {
        title: VAlert['title'],
        text: VAlert['text']
    }
) {
    const { overlayIsOpen } = useLoading()
    const { onAlert } = useAlert()

    return async (args: ParamsT) => {
        overlayIsOpen.value = true
        try {
            await event(args)
            if (successMessage) onAlert({
                type: 'success',
                ...successMessage
            })
        } catch (e) {
            if (e instanceof FetchError) {
                onAlert({
                    type: 'error',
                    title: e.data?.detail || $t("_errors.unknownError"),
                    text: e.data?.issue || e.data,
                    forDeveloper: typeof e.data == 'object' ? e.data : undefined
                })
            }
        } finally {
            overlayIsOpen.value = false
        }
    }
}