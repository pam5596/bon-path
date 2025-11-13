export default function() {
    const config = useRuntimeConfig()
    const alertContent = useState<STATE_TYPES['ALERT']>(STATE_KEYS.ALERT, () => null)
    
    const onAlert = (newAlertContent: STATE_TYPES['ALERT']) => {
        alertContent.value = newAlertContent

        setTimeout(() => {
            onCloseAlert()
        }, config.public.alertKeepTime)
    }

    const onCloseAlert = () => {
        alertContent.value = null
    }

    // [FIXIT]動作テスト用
    // onMounted(()=> {
    //     onAlert({
    //         type: 'info',
    //         title: 'test',
    //         text: 'text',
    //         forDeveloper: {
    //             code: 500,
    //             path: '/users',
    //             detail: 'ああああ',
    //             issue: 'user not found.',
    //             instance: 'Service'
    //         }
    //     })
    // })

    return {
        alertContent,
        onAlert,
        onCloseAlert
    }
}