export default function() {
    const { data, execute, refresh } = renderDashboard()

    const toReceiptRegisterCheck = (id: number) => 
        navigateTo(`/receipt-register/check/${id}`)

    const { isLoading, event: onDeleteReceiptEvent } = onDeleteReceipt(refresh)


    return {
        data,
        execute,
        toReceiptRegisterCheck,
        isLoading,
        onDeleteReceiptEvent
    }
}