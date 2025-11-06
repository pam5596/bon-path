export default defineNuxtRouteMiddleware(async (_to, _from) => {
    const response = await $fetch('/api/session/verify').catch(() => null)
    
    if (response) {
        return abortNavigation()
    } else {
        return navigateTo('/signin')
    }
})