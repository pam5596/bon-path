import type { SessionPayloads } from '@@/../share/payloads'

export default function() {
    const postSessionVerify = async (
        payload: SessionPayloads.Verify.POST.Request
    ) => {
        return await $fetch<undefined>(
            '/api/session/verify', {
                method: 'post',
                body: payload.body
            }
        )
    }

    const getSessionVerify = async () => {
        return await $fetch<SessionPayloads.Verify.GET.Response['body']>(
            '/api/session/verify'
        )
    }

    return {
        postSessionVerify,
        getSessionVerify
    }
}