import type { ReceiptImagePayloads } from "@share/payloads";

export default function () {
    const { getLocation } = useGeoLocation()
    const { postReceipt } = useReceipts()
    const { postReceiptImages } = useReceiptImages()

    return useAsyncOnEvent(
        async (images: ReceiptImagePayloads.POST.Request['body']['images']) => {
            const location = getLocation()

            const { id } = await postReceipt({
                body: location
            })
            await postReceiptImages({
                body: {
                    receiptId: id,
                    images
                }
            })
        }
    )
}