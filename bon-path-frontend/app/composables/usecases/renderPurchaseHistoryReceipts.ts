export default function() {
    const config = useRuntimeConfig()
    const { storeId } = useIdParams(['storeId'])
    const { getUserPurchaseStoresReceipts } = useUsers()
    const { getStore } = useStores()
    const { getReceiptImages } = useReceipts()

    return useAsyncOnRender(
        'render-purchase-history-receipts-usecase',
        async () => {
            const store = await getStore({ params: { id: storeId! }})

            const receipts = await getUserPurchaseStoresReceipts({
                params: {
                    storeId: storeId!
                }
            })
            const receipt_with_images = await Promise.all(
                receipts.receipts.map(
                    async (receipt) => ({
                        ...receipt,
                        images: await getReceiptImages({
                            params: {
                                receiptId: receipt.id
                            }
                        })
                    })
                )
            )

            return {
                store: new StoreModel(store),
                receipts: receipt_with_images.map(
                    (receipt) => new ReceiptModel({
                        ...receipt,
                        createdAt: new Date(receipt.createdAt),
                        images: receipt.images.images.map(
                            image => new ReceiptImageModel({
                                ...image,
                                url: `${config.public.sourceBase}${image.url}`
                            })
                        )
                    })
                )
            }
        }
    )
}