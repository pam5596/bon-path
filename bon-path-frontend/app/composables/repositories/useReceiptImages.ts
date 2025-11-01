import type { ReceiptImagePayloads } from '@share/payloads'

export default function() {
    const postReceiptImages = async (
        payload: ReceiptImagePayloads.POST.Request
    ) => {
        const form = new FormData()
        form.append('receiptId', payload.body.receiptId.toString())
        payload.body.images.forEach(
            (image) => form.append('images', image, image.name)
        )

        return await $fetch<undefined>(
            `/api/receipt-images`, {
                method: 'post',
                body: form
            }
        )
    }

    const deleteReceiptImage = async (
        payload: ReceiptImagePayloads.DELETE.Request
    ) => {
        return await $fetch<undefined>(
            `/api/receipt-images/${payload.params.id}`, {
                method: 'delete'
            }
        )
    }

    return {
        postReceiptImages,
        deleteReceiptImage
    }
}