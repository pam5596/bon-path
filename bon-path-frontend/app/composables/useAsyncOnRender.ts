import type { VAlert } from "vuetify/components"

export default function <ResponseT>(
    key: Parameters<typeof useAsyncData>[0],
    handler: Parameters<typeof useAsyncData<ResponseT>>[1],
    successMessage?: {
        title: VAlert['title'],
        text: VAlert['text']
    }
) {
    const { overlayIsOpen } = useLoading()
    const { onAlert } = useAlert()

    const { data, error, pending, status, execute } = useAsyncData<ResponseT, ServerError>(
        key, 
        handler, 
        {
            immediate: false,
            server: false
        }
    )

    watch(pending, (pending) => {
        overlayIsOpen.value = pending
    })

    watch(status, (status) => {
        if (successMessage && status === 'success') onAlert({
            type: 'success',
            ...successMessage
        })
    })

    watch(error, (error) => {
        if (typeof error?.data == 'object') {
            onAlert({
                type: 'error',
                title: error.data.detail,
                text: error.data.issue,
                forDeveloper: error.data
            })
        } else if (typeof error?.data == 'string') {
            onAlert({
                type: 'error',
                title: $t("_errors.unknownError"),
                text: error.data
            })
        }
    })

    return { data, error, pending, status, execute }
}