export default function() {
    const form = useState(STATE_KEYS.SIGNUP_FORM, ()=> ({
        password: '',
        email: ''
    }))

    const { isLoading, event: onSignupEvent } = onSignup()

    const toSigninEvent = () => navigateTo('/signin')

    return {
        form,
        isLoading,
        onSignupEvent,
        toSigninEvent,
        rules: {
            password: [useRule(useUserPassword())],
            email: [useRule(useUserEmail())]
        }
    }
}