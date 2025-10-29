import type { PurchasePayloads } from '@share/payloads'

export default async function() {
    const postPurchases = async (
        payload: Omit<PurchasePayloads.POST.Request, 'cookies'>
    ) => {
        return await $fetch<undefined>(
            `/api/purchases`, {
                method: 'post',
                body: payload.body
            }
        )
    }

    const getPurchase = async (
        payload: Omit<PurchasePayloads.GET.Request,'cookies'>
    ) => {
        return await useFetch<PurchasePayloads.GET.Response['body']>(
            `/api/purchases/${payload.params.id}`
        )
    }

    const deletePurchase = async (
        payload: Omit<PurchasePayloads.DELETE.Request,'cookies'>
    ) => {
        return await $fetch<undefined>(
            `/api/purchases/${payload.params.id}`, {
                method: 'delete'
            }
        )
    }

    return {
        postPurchases,
        getPurchase,
        deletePurchase
    }
}