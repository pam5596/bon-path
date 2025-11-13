import type { ReceiptImagePayloads } from '@@/../share/payloads'

export default function() {
    const config = useRuntimeConfig()
    
    const postReceiptImages = async (
        payload: ReceiptImagePayloads.POST.Request
    ) => {
        const form = new FormData()
        form.append('receiptId', payload.body.receiptId.toString())
        payload.body.images.forEach(
            (image) => form.append('images', image, image.name)
        )

        return await $fetch<undefined>(
            `${config.public.apiBase}/receipt-images`, {
                method: 'post',
                body: form,
                credentials: 'include'
            }
        )
    }

    const deleteReceiptImage = async (
        payload: ReceiptImagePayloads.DELETE.Request
    ) => {
        return await $fetch<undefined>(
            `${config.public.apiBase}/receipt-images/${payload.params.id}`, {
                method: 'delete'
            }
        )
    }

    return {
        postReceiptImages,
        deleteReceiptImage
    }
}