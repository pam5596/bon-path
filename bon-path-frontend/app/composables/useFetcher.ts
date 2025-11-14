export default function() {
    const config = useRuntimeConfig()

    return async <DataT>(
        path: string,
        opts?: Parameters<typeof $fetch>[1]
    ) => await $fetch<DataT>(
        path,
        {
            ...opts,
            credentials: 'include',
            baseURL: config.public.apiBase
        }
    )
}