export default function() {
    const { getUserPurchases } = useUsers()
    const { getStore } = useStores()

    return useAsyncOnRender(
        'render-purchase-history-stores-usecase',
        async () => {
            // [TODO]: いずれここの処理はひとつのAPIFetchで完結する可能性がある
            // [GET] - /users/purchases/stores
            const purchases = await getUserPurchases()

            const unique_store_ids = [
                ...new Map(purchases.purchases.map(
                    purchase => [purchase.storeId, purchase]
                )).keys()
            ]
            const stores = await Promise.all(
                unique_store_ids.map(
                    async (id) => ({
                        id,
                        ...await getStore({ params: { id }}),
                        purchases: purchases.purchases.filter(
                            (purchase) => purchase.storeId == id
                        )
                    })
                )
            )
            
            return stores.map(
                store => new StoreModel({
                    ...store,
                    purchases: store.purchases.map(
                        purchase => new PurchaseModel(purchase)
                    )
                })
            )
        }
    )
}