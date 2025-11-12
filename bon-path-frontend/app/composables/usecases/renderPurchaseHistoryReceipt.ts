export default function() {
    const { storeId, receiptId } = useIdParams(['storeId', 'receiptId'])
    const { getStore } = useStores()
    const { getReceipt, getReceiptImages, getReceiptPurchases } = useReceipts()
    const { getProduct } = useProducts()

    return useAsyncOnRender(
        'render-purchase-history-receipt-usecase',
        async () => {
            const store = await getStore({ params: { id: storeId! }})
            const receipt = await getReceipt({ params: { id: receiptId! }})
            const receipt_images = await getReceiptImages({ params: { receiptId: receiptId! }})

            const purchases = await getReceiptPurchases({ params: { receiptId: receiptId! } })
            const purchases_products = await Promise.all(
                purchases.purchases.map(
                    async (purchase) => ({
                        ...purchase,
                        product: await getProduct({ params: { id: purchase.productId } })
                    })
                )
            )

            return {
                store: new StoreModel(store),
                receipt: new ReceiptModel({ 
                    ...receipt,
                    images: receipt_images.images.map(
                        image => new ReceiptImageModel({
                            ...image,
                            url: `/source${image.url}`
                        })
                    )
                }),
                purchases: purchases_products.map(
                    purchase => new PurchaseModel({
                        ...purchase,
                        receiptId: receiptId!,
                        product: new ProductModel(purchase.product)
                    })
                )
            }
        }
    )
}