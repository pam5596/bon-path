export default defineNuxtRouteMiddleware(async (_to) => {
    const verifySessionRes = await $fetch(`${import.meta.env.BACKEND_DOMAIN}/session/verify`).catch(() => null)
    
    if (!verifySessionRes) return navigateTo('/signin')
})