import type { PurchasePayloads } from '@@/../share/payloads'

export default function() {
    const fetcher = useFetcher()

    const postPurchases = async (
        payload: Omit<PurchasePayloads.POST.Request, 'cookies'>
    ) => {
        return await fetcher<undefined>(
            `/purchases`, {
                method: 'post',
                body: payload.body,
            }
        )
    }

    const getPurchase = async (
        payload: Omit<PurchasePayloads.GET.Request,'cookies'>
    ) => {
        return await fetcher<PurchasePayloads.GET.Response['body']>(
            `/purchases/${payload.params.id}`
        )
    }

    const deletePurchase = async (
        payload: Omit<PurchasePayloads.DELETE.Request,'cookies'>
    ) => {
        return await fetcher<undefined>(
            `/purchases/${payload.params.id}`, {
                method: 'delete',
            }
        )
    }

    return {
        postPurchases,
        getPurchase,
        deletePurchase
    }
}