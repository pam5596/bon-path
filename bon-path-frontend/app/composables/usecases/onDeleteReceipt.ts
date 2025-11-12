export default function (refresher: () => void) {
    const { deleteReceipt } = useReceipts()

    return useAsyncOnEvent(
        async (id: number) => {
            await deleteReceipt({ params: { id }})
            refresher()
        }
    )
}