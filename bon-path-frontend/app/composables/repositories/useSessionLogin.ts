import type { SessionPayloads } from '@@/../share/payloads'

export default function() {
    const config = useRuntimeConfig()

    const postSessionLogin = async (
        payload: SessionPayloads.Login.POST.Request
    ) => {
        return await $fetch<undefined>(
            `${config.public.apiBase}/session/login`, {
                method: 'post',
                body: payload.body,
                credentials: 'include'
            }
        )
    }

    const getSessionLogin = async () => {
        return await $fetch<SessionPayloads.Login.GET.Response['body']>(
            `${config.public.apiBase}/session/login`,
            {
                credentials: 'include'
            }
        )
    }

    const deleteSessionLogin = async () => {
        return await $fetch<undefined>(
            `${config.public.apiBase}/session/login`, {
                method: 'delete',
                credentials: 'include'
            }
        )
    }

    return {
        postSessionLogin,
        getSessionLogin,
        deleteSessionLogin
    }
}