import type { SessionPayloads } from '@@/../share/payloads'

export default function() {
    const fetcher = useFetcher()

    const postSessionLogin = async (
        payload: SessionPayloads.Login.POST.Request
    ) => {
        return await fetcher<undefined>(
            `/session/login`, {
                method: 'post',
                body: payload.body,
            }
        )
    }

    const getSessionLogin = async () => {
        return await fetcher<SessionPayloads.Login.GET.Response['body']>(
            `/session/login`
        )
    }

    const deleteSessionLogin = async () => {
        return await fetcher<undefined>(
            `/session/login`, {
                method: 'delete',
            }
        )
    }

    return {
        postSessionLogin,
        getSessionLogin,
        deleteSessionLogin
    }
}