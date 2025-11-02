export default function() {
    const { receiptId } = useIdParams(['receiptId'])
    const { getReceiptImages } = useReceipts()
    const { postGptOcr } = useGptOcr()

    return useAsyncOnRender(
        'render-receipt-register-photo-usecase',
        async () => {
            const receipt_images = await getReceiptImages({ params: { receiptId: receiptId! }})
            const ocr_result = await postGptOcr({ body: {
                images: receipt_images.images.map(image => image.url)
            }})

            return {
                receipt_images: receipt_images.images.map(
                    image => new ReceiptImageModel(image)
                ),
                store: new StoreModel(ocr_result.store),
                products: ocr_result.products.map(
                    product => new ProductModel(product)
                )
            }
        }
    )
}