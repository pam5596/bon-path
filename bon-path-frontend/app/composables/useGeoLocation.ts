export default function() {
    const location = ref<{
        latitude: number,
        longitude: number
    }>()

    const getLocation = () => {
        if (!navigator.geolocation) throw createError({
            status: 501,
            message: 'お使いのブラウザでは位置情報機能がサポートされていません。'
        })

        navigator.geolocation.getCurrentPosition(
            (position) => {
                location.value = {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                }
            },
            (error) => {
                if (error.code === error.PERMISSION_DENIED) {
                    throw createError({
                        status: 403,
                        message: '位置情報機能がオンになっていません。ブラウザの設定を確認してください。'
                    })
                } else {
                    throw createError({
                        status: 500,
                        message: '位置情報が取得できませんでした。'
                    })
                }
            }
        )

        return location.value!
    }

    return {
        getLocation
    }
}