import type { SessionPayloads } from '@share/payloads'

export class SessionLoginRepository {
    async post(payload: SessionPayloads.Login.POST.Request) {
        return await useAPIFetch<undefined>(
            '/session/login', {
                method: 'post',
                body: payload.body
            }
        )
    }

    async get() {
        return await useAPIFetch<SessionPayloads.Login.GET.Response['body']>(
            '/session/login', {
                method: 'get'
            }
        )
    }

    async delete() {
        return await useAPIFetch<undefined>(
            '/session/login', {
                method: 'delete'
            }
        )
    }
}