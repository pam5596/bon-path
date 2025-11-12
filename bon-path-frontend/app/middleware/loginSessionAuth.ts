export default defineNuxtRouteMiddleware(async (_to, _from) => {
    const loginSessionRes = await $fetch('/api/session/login').catch(() => null)

    if (!loginSessionRes) return navigateTo('/signup')
})