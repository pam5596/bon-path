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

    async getReceipts(query?: UserPayloads.Receipts.GET.Request['query']) {
        return await useAPIFetch<UserPayloads.Receipts.GET.Response['body']>(
            '/users/receipts', {
                method: 'get',
                query
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

    async patch(body: UserPayloads.PATCH.Request['body']) {
        return await useAPIFetch<undefined>(
            '/users', {
                method: 'patch',
                body
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