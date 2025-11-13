import type { SessionPayloads } from '@@/../share/payloads'

export default function() {
    const config = useRuntimeConfig()

    const postSessionVerify = async (
        payload: SessionPayloads.Verify.POST.Request
    ) => {
        return await $fetch<undefined>(
            `${config.public.apiBase}/session/verify`, {
                method: 'post',
                body: payload.body,
                credentials: 'include'
            }
        )
    }

    const getSessionVerify = async () => {
        return await $fetch<SessionPayloads.Verify.GET.Response['body']>(
            `${config.public.apiBase}/session/verify`,
            {
                credentials: 'include'
            }
        )
    }

    const deleteSessionVerify = async () => {
        return await $fetch(
            `${config.public.apiBase}/session/verify`, {
                method: 'DELETE',
                credentials: 'include'
            }
        )
    }

    return {
        postSessionVerify,
        getSessionVerify,
        deleteSessionVerify
    }
}