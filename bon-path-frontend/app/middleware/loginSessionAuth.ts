export default defineNuxtRouteMiddleware(async (_to, _from) => {
    const loginSessionRes = await $fetch(`/session/login`, {
        baseURL: import.meta.env.API_BASE
    }).catch(() => null)

    if (!loginSessionRes) return navigateTo('/signup')
})