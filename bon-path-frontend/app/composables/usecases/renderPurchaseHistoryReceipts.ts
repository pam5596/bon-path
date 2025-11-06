export default function() {
    const { storeId } = useIdParams(['storeId'])
    const { getUserPurchases } = useUsers()
    const { getStore } = useStores()
    const { getReceipt, getReceiptImages } = useReceipts()

    return useAsyncOnRender(
        'render-purchase-history-receipts-usecase',
        async () => {
            // [TODO]: いずれここの処理はひとつのAPIFetchで完結する可能性がある
            // [GET] - /users/purchases/stores/:storeId/receipts
            const store = await getStore({ params: { id: storeId! }})

            const purchases = await getUserPurchases()
            const store_purchases = purchases.purchases.filter(
                purchase => purchase.storeId == storeId
            )

            const unique_receipt_ids = [
                ...new Map(store_purchases.map(
                    purchase => [purchase.receiptId, purchase]
                )).keys()
            ]

            const receipts = await Promise.all(
                unique_receipt_ids.map(
                    async (id) => ({
                        id,
                        ...await getReceipt({ params: { id }}),
                        images: (await getReceiptImages({ params: { receiptId: id }})).images
                    })
                )
            )

            return {
                store: new StoreModel(store),
                receipts: receipts.map(
                    (receipt) => new ReceiptModel({
                        ...receipt,
                        images: receipt.images.map(
                            image => new ReceiptImageModel(image)
                        )
                    })
                )
            }
        }
    )
}