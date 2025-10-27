import type { PurchasePayloads } from '@share/payloads'

export class PurchaseRepository {
    async post(payload: Omit<PurchasePayloads.POST.Request, 'cookies'>) {
        return await useAPIFetch<undefined>(
            `/purchases`, {
                method: 'post',
                body: payload.body
            }
        )
    }

    async get(payload: Omit<PurchasePayloads.GET.Request,'cookies'>) {
        return await useAPIFetch<PurchasePayloads.GET.Response['body']>(
            `/purchases/${payload.params.id}`, {
                method: 'get'
            }
        )
    }

    async delete(payload: Omit<PurchasePayloads.DELETE.Request,'cookies'>) {
        return await useAPIFetch<undefined>(
            `/purchases/${payload.params.id}`, {
                method: 'delete'
            }
        )
    }
}