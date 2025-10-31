export default function() {
    const dialogIsOpen = ref(false)
    const alertContent = useState<STATE_TYPES['ALERT']>(STATE_KEYS.ALERT, () => null)

    const onAlert = (newAlertContent: STATE_TYPES['ALERT']) => {
        alertContent.value = newAlertContent
        dialogIsOpen.value = true

        setTimeout(() => {
            onCloseAlert()
        }, 5000)
    }

    const onCloseAlert = () => {
        dialogIsOpen.value = false
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
        dialogIsOpen,
        alertContent,
        onAlert,
        onCloseAlert
    }
}