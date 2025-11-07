export default function() {
    const location = ref<{
        latitude: number,
        longitude: number
    }>()

    const getLocation = () => {
        if (!navigator.geolocation) throw createError({
            status: 501,
            message: $t("_errors.geoLocal.unSupported")
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
                        message: $t("_errors.geoLocal.unAvailable")
                    })
                } else {
                    throw createError({
                        status: 500,
                        message: $t("_errors.geoLocal.unknownError")
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