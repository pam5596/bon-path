import type { PurchasePayloads } from '@@/../share/payloads'

export default function() {
    const config = useRuntimeConfig()

    const postPurchases = async (
        payload: Omit<PurchasePayloads.POST.Request, 'cookies'>
    ) => {
        return await $fetch<undefined>(
            `${config.public.apiBase}/purchases`, {
                method: 'post',
                body: payload.body,
                credentials: 'include'
            }
        )
    }

    const getPurchase = async (
        payload: Omit<PurchasePayloads.GET.Request,'cookies'>
    ) => {
        return await $fetch<PurchasePayloads.GET.Response['body']>(
            `${config.public.apiBase}/purchases/${payload.params.id}`,
            {
                credentials: 'include'
            }
        )
    }

    const deletePurchase = async (
        payload: Omit<PurchasePayloads.DELETE.Request,'cookies'>
    ) => {
        return await $fetch<undefined>(
            `${config.public.apiBase}/purchases/${payload.params.id}`, {
                method: 'delete',
                credentials: 'include'
            }
        )
    }

    return {
        postPurchases,
        getPurchase,
        deletePurchase
    }
}