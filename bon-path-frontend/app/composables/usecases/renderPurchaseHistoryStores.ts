export default function() {
    const { getUserPurchasesStores } = useUsers()

    return useAsyncOnRender(
        'render-purchase-history-stores-usecase',
        async () => {
            const stores = await getUserPurchasesStores()
            
            return stores.stores.map(
                store => new StoreModel(store)
            )
        }
    )
}