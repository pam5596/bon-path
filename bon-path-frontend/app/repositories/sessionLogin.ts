import type { SessionPayloads } from '@share/payloads'

export class SessionLoginRepository {
    async post(body: SessionPayloads.Login.POST.Request['body']) {
        return await useAPIFetch<undefined>(
            '/session/login', {
                method: 'post',
                body
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