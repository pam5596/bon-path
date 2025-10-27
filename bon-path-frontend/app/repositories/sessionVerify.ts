import type { SessionPayloads } from '@share/payloads'

export class SessionVerifyRepository {
    async post(body: SessionPayloads.Verify.POST.Request['body']) {
        return await useAPIFetch<undefined>(
            '/session/verify', {
                method: 'post',
                body
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