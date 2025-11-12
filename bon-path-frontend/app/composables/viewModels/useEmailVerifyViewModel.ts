export default function () {
    const { status, execute } = renderEmailVerify()

    const toSignupEvent = () => navigateTo('/signup')
    const toSigninEvent = () => navigateTo('/signin')

    return {
        status,
        execute,
        toSignupEvent,
        toSigninEvent
    }
}