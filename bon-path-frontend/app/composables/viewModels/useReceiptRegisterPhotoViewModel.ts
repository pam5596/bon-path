export default function() {
    const form = shallowRef<File[]>([])
    const previewUrls = ref<string[]>([])
    const isSubmitAble = ref(false)

    const { location, getLocation } = useGeoLocation()

    watch(form, (files) => {
        previewUrls.value = []
        previewUrls.value = files.map(
            file => URL.createObjectURL(file)
        )

        isSubmitAble.value = !!files.length
    })

    const { 
        event: onSaveReceiptEvent 
    } = onSaveReceipt()
    const { 
        event: onSaveReceiptAndCheckEvent 
    } = onSaveReceiptAndCheck()

    const dialog = ref(false)
    const onOpenDialogEvent = () => dialog.value = true

    return {
        form,
        location,
        previewUrls,
        isSubmitAble,
        dialog,
        getLocation,
        onSaveReceiptEvent,
        onSaveReceiptAndCheckEvent,
        onOpenDialogEvent
    }
}