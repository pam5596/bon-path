export default function() {
    const overlayIsOpen = ref<STATE_TYPES['IS_LOADING']>(false)

    // [FIXIT]動作テスト用
    // onMounted(() => {
    //     overlayIsOpen.value = true
    // })

    return {
        overlayIsOpen
    }
}