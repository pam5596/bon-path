export default defineNuxtRouteMiddleware(async (_to) => {
    const verifySessionRes = await $fetch(`/session/verify`,{
        baseURL: import.meta.env.API_BASE
    }).catch(() => null)
    
    if (!verifySessionRes) return navigateTo('/signin')
})