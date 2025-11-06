export default function() {
    return useAsyncOnRender(
        'render-receipt-register-photo-usecase',
        async () => {
            const image_files = ref<File[]>([])
            const preview_urls = ref<string[]>([])

            watch(image_files, (files) => {
                preview_urls.value = []
                preview_urls.value = files.map(
                    file => URL.createObjectURL(file)
                )
            })

            return {
                image_files,
                preview_urls
            }
        }
    )
}