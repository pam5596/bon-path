export default function() {
    const config = useRuntimeConfig()
    const { getUser, getUserReceipts } = useUsers()
    const { getReceiptImages } = useReceipts()

    return useAsyncOnRender(
        'render-dashboard-usecase',
        async () => {
            const user = await getUser()

            const receipts = await getUserReceipts({ query: { isChecked: false }})
            const receipts_with_images = await Promise.all(
                receipts.receipts.map(
                    async (receipt) => ({
                        ...receipt,
                        ...await getReceiptImages({ params: { receiptId: receipt.id }})
                    })
                )
            )

            return {
                user: new UserModel({ ...user, createdAt: new Date(user.createdAt)}),
                receipts: receipts_with_images.map(
                    (receipt) => new ReceiptModel({
                        ...receipt,
                        createdAt: new Date(receipt.createdAt),
                        images: receipt.images.map(
                            (image) => new ReceiptImageModel({
                                ...image,
                                url: `${config.public.sourceBase}${image.url}`,
                                createdAt: new Date(image.createdAt)
                            })
                        )
                    })
                )
            }
        }
    )
}