import type { ReceiptPayloads } from '@@/../share/payloads'

export default function() {
    const config = useRuntimeConfig()

    const postReceipt = async (
        payload: Omit<ReceiptPayloads.POST.Request,'cookies'>
    ) => {
        return await $fetch<ReceiptPayloads.POST.Response['body']>(
            `${config.public.apiBase}/receipts`, {
                method: 'post',
                body: payload.body,
                credentials: 'include'
            }
        )
    }

    const getReceipt = async (
        payload: Omit<ReceiptPayloads.GET.Request,'cookies'>
    ) => {
        return await $fetch<ReceiptPayloads.GET.Response['body']>(
            `${config.public.apiBase}/receipts/${payload.params.id}`,
            {
                credentials: 'include'
            }
        )
    }

    const getReceiptPurchases = async (
        payload: ReceiptPayloads.Purchases.GET.Request
    ) => {
        return await $fetch<ReceiptPayloads.Purchases.GET.Response['body']>(
            `${config.public.apiBase}/receipts/${payload.params.receiptId}/purchases`,
            {
                credentials: 'include'
            }
        )
    }

    const getReceiptImages = async (
        payload: ReceiptPayloads.Images.GET.Request
    ) => {
        return await $fetch<ReceiptPayloads.Images.GET.Response['body']>(
            `${config.public.apiBase}/receipts/${payload.params.receiptId}/images`,
            {
                credentials: 'include'
            }
        )
    }

    const patchReceipt = async (
        payload: Omit<ReceiptPayloads.PATCH.Request,'cookies'>
    ) => {
        return await $fetch<undefined>(
            `${config.public.apiBase}/receipts/${payload.params.id}`, {
                method: 'patch',
                body: payload.body,
                credentials: 'include'
            }
        )
    }

    const deleteReceipt = async (
        payload: Omit<ReceiptPayloads.DELETE.Request, 'cookies'>
    ) => {
        return await $fetch<undefined>(
            `${config.public.apiBase}/receipts/${payload.params.id}`, {
                method: 'delete',
                credentials: 'include'
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