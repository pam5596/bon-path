import type { ReceiptImagePayloads, ReceiptPayloads } from "@@/../share/payloads";

export default function () {
    const { postReceipt } = useReceipts()
    const { postReceiptImages } = useReceiptImages()

    return useAsyncOnEvent(
        async (
            request: {
                images: ReceiptImagePayloads.POST.Request['body']['images'],
                location: ReceiptPayloads.POST.Request['body']
            }
        ) => {
            const { id } = await postReceipt({
                body: request.location
            })
            await postReceiptImages({
                body: {
                    receiptId: id,
                    images: request.images
                }
            })
            navigateTo(`/receipt-register/check/${id}`)
        }
    )
}