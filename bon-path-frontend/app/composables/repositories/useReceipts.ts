import type { ReceiptPayloads } from '@share/payloads'

export default function() {
    const postReceipt = async (
        payload: Omit<ReceiptPayloads.POST.Request,'cookies'>
    ) => {
        return await $fetch<ReceiptPayloads.POST.Response['body']>(
            '/api/receipts', {
                method: 'post',
                body: payload.body
            }
        )
    }

    const getReceipt = async (
        payload: Omit<ReceiptPayloads.GET.Request,'cookies'>
    ) => {
        return await $fetch<ReceiptPayloads.GET.Response['body']>(
            `/api/receipts/${payload.params.id}`
        )
    }

    const getReceiptPurchases = async (
        payload: ReceiptPayloads.Purchases.GET.Request
    ) => {
        return await $fetch<ReceiptPayloads.Purchases.GET.Response['body']>(
            `/api/receipts/${payload.params.receiptId}/purchases`
        )
    }

    const getReceiptImages = async (
        payload: ReceiptPayloads.Images.GET.Request
    ) => {
        return await $fetch<ReceiptPayloads.Images.GET.Response['body']>(
            `/api/receipts/${payload.params.receiptId}/images`
        )
    }

    const patchReceipt = async (
        payload: Omit<ReceiptPayloads.PATCH.Request,'cookies'>
    ) => {
        return await $fetch<undefined>(
            `/api/receipts/${payload.params.id}`, {
                method: 'patch',
                body: payload.body
            }
        )
    }

    const deleteReceipt = async (
        payload: Omit<ReceiptPayloads.DELETE.Request, 'cookies'>
    ) => {
        return await $fetch<undefined>(
            `/api/receipts/${payload.params.id}`, {
                method: 'delete',
            }
        )
    }

    return {
        postReceipt,
        getReceipt,
        getReceiptImages,
        getReceiptPurchases,
        patchReceipt,
        deleteReceipt
    }
}