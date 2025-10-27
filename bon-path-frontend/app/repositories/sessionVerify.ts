import type { SessionPayloads } from '@share/payloads'

export class SessionVerifyRepository {
    async post(payload: SessionPayloads.Verify.POST.Request) {
        return await useAPIFetch<undefined>(
            '/session/verify', {
                method: 'post',
                body: payload.body
            }
        )
    }

    async get() {
        return await useAPIFetch<SessionPayloads.Verify.GET.Response['body']>(
            '/session/verify', {
                method: 'get'
            }
        )
    }
}