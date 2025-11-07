import type { UserPayloads } from '@@/../share/payloads'

export default function() {
    const postUser = async () => {
        return await $fetch<UserPayloads.POST.Response['body']>(
            '/api/users', {
                method: 'post'
            }
        )
    }

    const getUser = async () => {
        return await $fetch<UserPayloads.GET.Response['body']>(
            '/api/users'
        )
    }

    const getUserReceipts = async (
        payload: Omit<UserPayloads.Receipts.GET.Request,'cookies'>
    ) => {
        return await $fetch<UserPayloads.Receipts.GET.Response['body']>(
            '/api/users/receipts', {
                query: payload.query
            }
        )
    }

    const getUserPurchases = async () => {
        return await $fetch<UserPayloads.Purchases.GET.Response['body']>(
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