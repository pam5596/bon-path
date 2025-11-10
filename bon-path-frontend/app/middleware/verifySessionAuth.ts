export default defineNuxtRouteMiddleware(async (_to) => {
    const response = await $fetch('/api/session/verify').catch(() => null)
    
    if (!response) return navigateTo('/signin')
})