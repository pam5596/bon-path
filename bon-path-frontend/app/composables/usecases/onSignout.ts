export default function () {
    const { deleteSessionLogin } = useSessionLogin()

    return useAsyncOnEvent(
        async () => {
            await deleteSessionLogin()
            navigateTo('/signup')
        }
    )
}