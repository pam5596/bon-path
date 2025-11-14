import type { SessionPayloads } from '@@/../share/payloads'

export default function() {
    const fetcher = useFetcher()

    const postSessionVerify = async (
        payload: SessionPayloads.Verify.POST.Request
    ) => {
        return await fetcher<undefined>(
            `/session/verify`, {
                method: 'post',
                body: payload.body,
            }
        )
    }

    const getSessionVerify = async () => {
        return await fetcher<SessionPayloads.Verify.GET.Response['body']>(
            `/session/verify`
        )
    }

    const deleteSessionVerify = async () => {
        return await fetcher(
            `/session/verify`, {
                method: 'DELETE',
            }
        )
    }

    return {
        postSessionVerify,
        getSessionVerify,
        deleteSessionVerify
    }
}