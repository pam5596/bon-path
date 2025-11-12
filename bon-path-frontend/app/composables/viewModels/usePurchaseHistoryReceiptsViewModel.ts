export default function() {
    const route = useRoute()
    const { data, execute, refresh } = renderPurchaseHistoryReceipts()

    const toReceiptEvent = (receiptId: number) =>
        navigateTo(`${route.path}/${receiptId}`) 

    const { event: onDeleteReceiptEvent } = onDeleteReceipt(refresh)

    return {
        data,
        execute,
        toReceiptEvent,
        onDeleteReceiptEvent
    }
}