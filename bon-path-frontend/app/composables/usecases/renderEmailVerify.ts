export default function() {
    const { postUser } = useUsers()

    return useAsyncOnRender(
        'render-dashboard-usecase',
        async () => {
            const { hashedId } = await postUser()
            // [TODO]: ここに/session/verify - DELETEの処理が必要

            return hashedId
        }
    )
}