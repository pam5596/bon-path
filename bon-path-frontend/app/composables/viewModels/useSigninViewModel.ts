export default function() {
    const form = useState(STATE_KEYS.SIGNIN_FORM, ()=> ({
        name: '',
        password: '',
        email: ''
    }))

    const { isLoading, event: onSigninEvent } = onSignin()

    const toSignupEvent = () => navigateTo('/signup')

    return {
        form,
        isLoading,
        onSigninEvent,
        toSignupEvent,
        rules: {
            name: [useRule(useUserName())],
            password: [useRule(useUserPassword())],
            email: [useRule(useUserEmail())]
        }
    }
}