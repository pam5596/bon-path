import type { ReceiptPayloads } from '@share/payloads'

export class ReceiptRepository {
    async post(payload: Omit<ReceiptPayloads.POST.Request,'cookies'>) {
        return await useAPIFetch<ReceiptPayloads.POST.Response['body']>(
            '/receipts', {
                method: 'post',
                body: payload.body
            }
        )
    }

    async get(payload: Omit<ReceiptPayloads.GET.Request,'cookies'>) {
        return await useAPIFetch<ReceiptPayloads.GET.Response['body']>(
            `/receipts/${payload.params.id}`, {
                method: 'get',
            }
        )
    }

    async getPurchases(payload: ReceiptPayloads.Purchases.GET.Request) {
        return await useAPIFetch<ReceiptPayloads.Purchases.GET.Response['body']>(
            `/receipts/${payload.params.receiptId}/purchases`, {
                method: 'get'
            }
        )
    }

    async getImages(payload: ReceiptPayloads.Images.GET.Request) {
        return await useAPIFetch<ReceiptPayloads.Images.GET.Response['body']>(
            `/receipts/${payload.params.receiptId}/images`, {
                method: 'get'
            }
        )
    }

    async patch(payload: Omit<ReceiptPayloads.PATCH.Request,'cookies'>) {
        return await useAPIFetch<undefined>(
            `/receipts/${payload.params.id}`, {
                method: 'patch',
                body: payload.body
            }
        )
    }

    async delete(payload: Omit<ReceiptPayloads.DELETE.Request, 'cookies'>) {
        return await useAPIFetch<undefined>(
            `/receipts/${payload.params.id}`, {
                method: 'delete',
            }
        )
    }
}