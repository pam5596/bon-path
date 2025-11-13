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

    const asyncData = useAsyncData<ResponseT, ServerError>(
        key, 
        handler, 
        {
            immediate: false,
            server: false,
        }
    )

    watch(asyncData.pending, (pending) => {
        overlayIsOpen.value = pending
    })

    watch(asyncData.status, (status) => {
        if (successMessage && status === 'success') onAlert({
            type: 'success',
            ...successMessage
        })
    })

    watch(asyncData.error, (error) => {
        console.error(error?.data)
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

    return asyncData
}