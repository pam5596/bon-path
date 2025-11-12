export default function() {
    const route = useRoute()
    const { data, execute } = renderPurchaseHistoryStores()

    const toReceiptsEvent = (storeId: number) => navigateTo(`${route.path}/${storeId}/receipts`)

    return {
        data,
        execute,
        toReceiptsEvent
    }
}