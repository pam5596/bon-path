export default function () {
    const { deleteReceipt } = useReceipts()

    return useAsyncOnEvent(
        async (id: number) => {
            await deleteReceipt({ params: { id }})
        }
    )
}