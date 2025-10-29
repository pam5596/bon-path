import type { SessionPayloads } from '@share/payloads'

export default async function() {
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
        return await useFetch<SessionPayloads.Verify.GET.Response['body']>(
            '/api/session/verify'
        )
    }

    return {
        postSessionVerify,
        getSessionVerify
    }
}