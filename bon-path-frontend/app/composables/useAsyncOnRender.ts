import type { VAlert } from "vuetify/components"
import type { ServerError } from "~/models"

export default async function <ResponseT>(
    key: Parameters<typeof useAsyncData>[0],
    handler: Parameters<typeof useAsyncData<ResponseT>>[1],
    successMessage: {
        title: VAlert['title'],
        text: VAlert['text']
    }
) {
    const { overlayIsOpen } = useLoading()
    const { onAlert } = useAlert()

    const { data, error, pending, status } = useAsyncData<ResponseT, ServerError>(
        key, 
        handler, 
        {
            server: false
        }
    )

    watch(pending, (pending) => {
        overlayIsOpen.value = pending
    })

    watch(status, (status) => {
        if (status === 'success') onAlert({
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
                title: '不明なエラーが発生しました。',
                text: error.data
            })
        }
    })

    return { data }
}