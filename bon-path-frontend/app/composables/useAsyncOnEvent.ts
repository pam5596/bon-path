import type { VAlert } from "vuetify/components"
import { FetchError } from 'ofetch'

export default function <ParamsT>(
    callback: (args: ParamsT) => Promise<void>,
    successMessage?: {
        title: VAlert['title'],
        text: VAlert['text']
    }
) {
    const { overlayIsOpen } = useLoading()
    const { onAlert } = useAlert()
    const { t } = useI18n()

    const event = async (args: ParamsT) => {
        overlayIsOpen.value = true
        try {
            await callback(args)
            if (successMessage) onAlert({
                type: 'success',
                ...successMessage
            })
        } catch (e) {
            if (e instanceof FetchError) {
                console.error(e)
                onAlert({
                    type: 'error',
                    title: e.data?.detail || t("_errors.unknownError"),
                    text: e.data?.issue || e.data,
                    forDeveloper: typeof e.data == 'object' ? e.data : undefined
                })
            }
        } finally {
            overlayIsOpen.value = false
        }
    }

    return {
        isLoading: overlayIsOpen,
        event
    }
}