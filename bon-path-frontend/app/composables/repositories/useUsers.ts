import type { UserPayloads } from '@@/../share/payloads'

export default function() {
    const fetcher = useFetcher()

    const postUser = async () => {
        return await fetcher<UserPayloads.POST.Response['body']>(
            `/users`, {
                method: 'post',
            }
        )
    }

    const getUser = async () => {
        return await fetcher<UserPayloads.GET.Response['body']>(
            `/users`
        )
    }

    const getUserReceipts = async (
        payload: Omit<UserPayloads.Receipts.GET.Request,'cookies'>
    ) => {
        return await fetcher<UserPayloads.Receipts.GET.Response['body']>(
            `/users/receipts`, {
                query: payload.query,
            }
        )
    }

    const getUserPurchases = async () => {
        return await fetcher<UserPayloads.Purchases.GET.Response['body']>(
            `/users/purchases`
        )
    }

    const getUserPurchasesStores = async () => {
        return await fetcher<UserPayloads.Purchases.Stores.GET.Response['body']>(
            `/users/purchases/stores`
        )
    }

    const getUserPurchaseStoresReceipts = async (
        payload: Omit<UserPayloads.Purchases.Stores.Receipts.GET.Request,'cookies'>
    ) => {
        return await fetcher<UserPayloads.Purchases.Stores.Receipts.GET.Response['body']>(
            `/users/purchases/stores/${payload.params.storeId}/receipts`
        )
    }

    const patchUser = async (
        payload: Omit<UserPayloads.PATCH.Request,'cookies'>
    ) => {
        return await fetcher<undefined>(
            `/users`, {
                method: 'patch',
                body: payload.body,
            }
        )
    }

    const deleteUser = async () => {
        return await fetcher<undefined>(
            `/users`, {
                method: 'delete',
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