import type { ReceiptImagePayloads } from '@share/payloads'

export class ReceiptImageRepository {
    async post(payload: ReceiptImagePayloads.POST.Request) {
        return await useAPIFetch<undefined>(
            `/receipt-images`, {
                method: 'post',
                body: payload.body
            }
        )
    }

    async delete(payload: ReceiptImagePayloads.DELETE.Request) {
        return await useAPIFetch<undefined>(
            `/receipt-images/${payload.params.id}`, {
                method: 'delete'
            }
        )
    }
}