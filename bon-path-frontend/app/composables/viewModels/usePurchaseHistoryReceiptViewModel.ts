export default function() {
    const { receiptId } = useIdParams(['storeId', 'receiptId'])
    const { data, execute } = renderPurchaseHistoryReceipt()

    const onDeleteReceiptDispatch = onDeleteReceipt(() => navigateTo('/purchase-history/stores'))
    const onDeleteReceiptEvent = () => onDeleteReceiptDispatch.event(receiptId!)

    return {
        data,
        execute,
        onDeleteReceiptEvent
    }
}