export default function (refresher: () => void) {
    const { deleteReceipt } = useReceipts()
    const { deleteReceiptImage } = useReceiptImages()

    return useAsyncOnEvent(
        async (id: number) => {
            await deleteReceipt({ params: { id }})
            refresher()
            await deleteReceiptImage({ params: { id }})
        }
    )
}