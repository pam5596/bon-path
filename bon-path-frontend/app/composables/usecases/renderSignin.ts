export default function() {
    return useAsyncOnRender(
        'render-signin-usecase', 
        async () => {
            return reactive({
                password: '',
                email: '',
                name: ''
            })
        }
    )
}