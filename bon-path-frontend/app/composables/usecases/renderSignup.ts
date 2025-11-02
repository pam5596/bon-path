export default function() {
    return useAsyncOnRender(
        'render-signup-usecase',
        async () => {
            return reactive({
                password: '',
                email: ''
            })
        }
    )
}