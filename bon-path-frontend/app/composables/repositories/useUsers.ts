import type { UserPayloads } from '@@/../share/payloads'

export default function() {
    const config = useRuntimeConfig()

    const postUser = async () => {
        return await $fetch<UserPayloads.POST.Response['body']>(
            `${config.public.apiBase}/users`, {
                method: 'post',
                credentials: 'include'
            }
        )
    }

    const getUser = async () => {
        return await $fetch<UserPayloads.GET.Response['body']>(
            `${config.public.apiBase}/users`,
            {
                credentials: 'include'
            }
        )
    }

    const getUserReceipts = async (
        payload: Omit<UserPayloads.Receipts.GET.Request,'cookies'>
    ) => {
        return await $fetch<UserPayloads.Receipts.GET.Response['body']>(
            `${config.public.apiBase}/users/receipts`, {
                query: payload.query,
                credentials: 'include'
            }
        )
    }

    const getUserPurchases = async () => {
        return await $fetch<UserPayloads.Purchases.GET.Response['body']>(
            `${config.public.apiBase}/users/purchases`,
            {
                credentials: 'include'
            }
        )
    }

    const getUserPurchasesStores = async () => {
        return await $fetch<UserPayloads.Purchases.Stores.GET.Response['body']>(
            `${config.public.apiBase}/users/purchases/stores`,
            {
                credentials: 'include'
            }
        )
    }

    const getUserPurchaseStoresReceipts = async (
        payload: Omit<UserPayloads.Purchases.Stores.Receipts.GET.Request,'cookies'>
    ) => {
        return await $fetch<UserPayloads.Purchases.Stores.Receipts.GET.Response['body']>(
            `${config.public.apiBase}/users/purchases/stores/${payload.params.storeId}/receipts`,
            {
                credentials: 'include'
            }
        )
    }

    const patchUser = async (
        payload: Omit<UserPayloads.PATCH.Request,'cookies'>
    ) => {
        return await $fetch<undefined>(
            `${config.public.apiBase}/users`, {
                method: 'patch',
                body: payload.body,
                credentials: 'include'
            }
        )
    }

    const deleteUser = async () => {
        return await $fetch<undefined>(
            `${config.public.apiBase}/users`, {
                method: 'delete',
                credentials: 'include'
            }
        )
    }

    return {
        postUser,
        getUser,
        getUserReceipts,
        getUserPurchases,
        getUserPurchasesStores,
        getUserPurchaseStoresReceipts,
        patchUser,
        deleteUser
    }
}