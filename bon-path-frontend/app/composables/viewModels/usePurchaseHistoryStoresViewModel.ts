export default function() {
    const { data, execute } = renderPurchaseHistoryStores()

    const toReceipts = (storeId: number) => navigateTo(`/purchase-history/stores/${storeId}/receipts`)

    return {
        data,
        execute,
        toReceipts
    }
}