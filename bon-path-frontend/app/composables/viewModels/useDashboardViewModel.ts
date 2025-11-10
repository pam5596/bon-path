export default function() {
    const { data, execute } = renderDashboard()

    const toReceiptRegisterCheck = (id: number) => 
        navigateTo(`/receipt-register/check/${id}`)

    const { isLoading, event: onDeleteReceiptEvent } = onDeleteReceipt()

    return {
        data,
        execute,
        toReceiptRegisterCheck,
        isLoading,
        onDeleteReceiptEvent
    }
}