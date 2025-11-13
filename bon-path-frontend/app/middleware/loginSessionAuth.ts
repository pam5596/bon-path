export default defineNuxtRouteMiddleware(async (_to, _from) => {
    const loginSessionRes = await $fetch(`${import.meta.env.BACKEND_DOMAIN}/session/login`).catch(() => null)

    if (!loginSessionRes) return navigateTo('/signup')
})