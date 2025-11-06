import type { SessionPayloads } from '@share/payloads'

export default function() {
    const postSessionLogin = async (
        payload: SessionPayloads.Login.POST.Request
    ) => {
        return await $fetch<undefined>(
            '/api/session/login', {
                body: payload.body
            }
        )
    }

    const getSessionLogin = async () => {
        return await $fetch<SessionPayloads.Login.GET.Response['body']>(
            '/api/session/login'
        )
    }

    const deleteSessionLogin = async () => {
        return await $fetch<undefined>(
            '/api/session/login', {
                method: 'delete'
            }
        )
    }

    return {
        postSessionLogin,
        getSessionLogin,
        deleteSessionLogin
    }
}