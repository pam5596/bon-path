import type { UserPayloads } from '@share/payloads'

export class UserRepository {
    async post() {
        return await useAPIFetch<UserPayloads.POST.Response['body']>(
            '/users', {
                method: 'post'
            }
        )
    }

    async get() {
        return await useAPIFetch<UserPayloads.GET.Response['body']>(
            '/users', {
                method: 'get'
            }
        )
    }

    async getReceipts(payload: Omit<UserPayloads.Receipts.GET.Request,'cookies'>) {
        return await useAPIFetch<UserPayloads.Receipts.GET.Response['body']>(
            '/users/receipts', {
                method: 'get',
                query: payload.query
            }
        )
    }

    async getPurchases() {
        return await useAPIFetch<UserPayloads.Purchases.GET.Response['body']>(
            '/users/purchases', {
                method: 'get',
            }
        )
    }

    async patch(payload: Omit<UserPayloads.PATCH.Request,'cookies'>) {
        return await useAPIFetch<undefined>(
            '/users', {
                method: 'patch',
                body: payload.body
            }
        )
    }

    async delete() {
        return await useAPIFetch<undefined>(
            '/users', {
                method: 'delete',
            }
        )
    }
}