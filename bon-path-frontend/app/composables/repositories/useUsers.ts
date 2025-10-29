import type { UserPayloads } from '@share/payloads'

export default async function() {
    const postUser = async () => {
        return await $fetch<UserPayloads.POST.Response['body']>(
            '/api/users', {
                method: 'post'
            }
        )
    }

    const getUser = async () => {
        return await useFetch<UserPayloads.GET.Response['body']>(
            '/api/users'
        )
    }

    const getUserReceipts = async (
        payload: Omit<UserPayloads.Receipts.GET.Request,'cookies'>
    ) => {
        return await useFetch<UserPayloads.Receipts.GET.Response['body']>(
            '/api/users/receipts', {
                query: payload.query
            }
        )
    }

    const getUserPurchases = async () => {
        return await useFetch<UserPayloads.Purchases.GET.Response['body']>(
            '/api/users/purchases'
        )
    }

    const patchUser = async (
        payload: Omit<UserPayloads.PATCH.Request,'cookies'>
    ) => {
        return await $fetch<undefined>(
            '/api/users', {
                method: 'patch',
                body: payload.body
            }
        )
    }

    const deleteUser = async () => {
        return await $fetch<undefined>(
            '/api/users', {
                method: 'delete'
            }
        )
    }

    return {
        postUser,
        getUser,
        getUserReceipts,
        getUserPurchases,
        patchUser,
        deleteUser
    }
}