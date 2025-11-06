export default function() {
    const { receiptId } = useIdParams(['receiptId'])
    const { getReceiptImages } = useReceipts()
    const { postGptOcr } = useGptOcr()

    return useAsyncOnRender(
        'render-receipt-register-check-usecase',
        async () => {
            const receipt_images = await getReceiptImages({ params: { receiptId: receiptId! }})
            const ocrResult = await postGptOcr({ body: {
                images: receipt_images.images.map(image => image.url)
            }})

            return {
                receiptImages: receipt_images.images.map(
                    image => new ReceiptImageModel(image)
                ),
                store: new StoreModel(ocrResult.store),
                products: ocrResult.products.map(
                    product => new ProductModel({
                        ...product,
                        categoryId: 1
                    })
                ),
                purchases: ocrResult.products.map(
                    purchase => new PurchaseModel({
                        receiptId: receiptId!,
                        price: purchase.price,
                        quantity: purchase.quantity,
                        product: new ProductModel({
                            categoryId: 1,
                            name: purchase.name,
                            price: purchase.price
                        })
                    })
                ),
            }
        }
    )
}