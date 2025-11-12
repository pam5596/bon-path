export default defineNuxtRouteMiddleware(async (_to) => {
    const verifySessionRes = await $fetch('/api/session/verify').catch(() => null)
    
    if (!verifySessionRes) return navigateTo('/signin')
})