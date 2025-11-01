export default function() {
    const overlayIsOpen = useState<STATE_TYPES['IS_LOADING']>(
        STATE_KEYS.IS_LOADING,
        () => false
    )

    // [FIXIT]動作テスト用
    // onMounted(() => {
    //     overlayIsOpen.value = true
    // })

    return {
        overlayIsOpen
    }
}