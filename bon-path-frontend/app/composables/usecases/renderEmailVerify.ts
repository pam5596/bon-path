export default function() {
    const { postUser } = useUsers()
    const { deleteSessionVerify } = useSessionVerify()

    return useAsyncOnRender(
        'render-email-verify-usecase',
        async () => {
            const { hashedId } = await postUser()
            await deleteSessionVerify()

            return hashedId
        }
    )
}