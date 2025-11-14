import type { ReceiptPayloads } from '@@/../share/payloads'

export default function() {
    const fetcher = useFetcher()

    const postReceipt = async (
        payload: Omit<ReceiptPayloads.POST.Request,'cookies'>
    ) => {
        return await fetcher<ReceiptPayloads.POST.Response['body']>(
            `/receipts`, {
                method: 'post',
                body: payload.body
            }
        )
    }

    const getReceipt = async (
        payload: Omit<ReceiptPayloads.GET.Request,'cookies'>
    ) => {
        return await fetcher<ReceiptPayloads.GET.Response['body']>(
            `/receipts/${payload.params.id}`
        )
    }

    const getReceiptPurchases = async (
        payload: ReceiptPayloads.Purchases.GET.Request
    ) => {
        return await fetcher<ReceiptPayloads.Purchases.GET.Response['body']>(
            `/receipts/${payload.params.receiptId}/purchases`
        )
    }

    const getReceiptImages = async (
        payload: ReceiptPayloads.Images.GET.Request
    ) => {
        return await fetcher<ReceiptPayloads.Images.GET.Response['body']>(
            `/receipts/${payload.params.receiptId}/images`
        )
    }

    const patchReceipt = async (
        payload: Omit<ReceiptPayloads.PATCH.Request,'cookies'>
    ) => {
        return await fetcher<undefined>(
            `/receipts/${payload.params.id}`, {
                method: 'patch',
                body: payload.body,
            }
        )
    }

    const deleteReceipt = async (
        payload: Omit<ReceiptPayloads.DELETE.Request, 'cookies'>
    ) => {
        return await fetcher<undefined>(
            `/receipts/${payload.params.id}`, {
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