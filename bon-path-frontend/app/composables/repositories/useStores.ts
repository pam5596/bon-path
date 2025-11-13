import type { StorePayloads } from "@@/../share/payloads";

export default function() {
    const config = useRuntimeConfig()

    const postStore = async (
        payload: StorePayloads.POST.Request
    ) => {
        return await $fetch<StorePayloads.POST.Response['body']>(
            `${config.public.apiBase}/stores`, {
                method: 'post',
                body: payload.body,
                credentials: 'include'
            }
        )
    }

    const getStores = async (
        payload: StorePayloads.Stores.GET.Request
    ) => {
        return await $fetch<StorePayloads.Stores.GET.Response['body']>(
            `${config.public.apiBase}/stores`, {
                query: payload.query,
                credentials: 'include'
            }
        )
    }

    const getStore = async (
        payload: StorePayloads.GET.Request
    ) => {
        return await $fetch<StorePayloads.GET.Response['body']>(
            `${config.public.apiBase}/stores/${payload.params.id}`,
            {
                credentials: 'include'
            }
        )
    }

    const getStoreProducts = async (
        payload: StorePayloads.Products.GET.Request
    ) => {
        return await $fetch<StorePayloads.Products.GET.Response['body']>(
            `${config.public.apiBase}/stores/${payload.params.storeId}/products`,
            {
                credentials: 'include'
            }
        )
    }

    const getStoresVectorSearch = async (
        payload: StorePayloads.VectorSearch.GET.Request
    ) => {
        return await $fetch<StorePayloads.VectorSearch.GET.Response['body']>(
            `${config.public.apiBase}/stores/vector-search`, {
                query: payload.query,
                credentials: 'include'
            }
        )
    }

    const getStoresGoogleMapSearch = async (
        payload: StorePayloads.GoogleMapSearch.GET.Request
    ) => {
        return await $fetch<StorePayloads.GoogleMapSearch.GET.Response['body']>(
            `${config.public.apiBase}/stores/google-map-search`, {
                query: payload.query,
                credentials: 'include'
            }
        )
    }

    const patchStore = async (
        payload: StorePayloads.PATCH.Request
    ) => {
        return await $fetch<undefined>(
            `${config.public.apiBase}/stores/${payload.params.id}`, {
                method: 'patch',
                body: payload.body,
                credentials: 'include'
            }
        )
    }

    const deleteStore = async (
        payload: StorePayloads.DELETE.Request
    ) => {
        return await $fetch<undefined>(
            `${config.public.apiBase}/stores/${payload.params.id}`, {
                method: 'delete',
                credentials: 'include'
            }
        )
    }

    return {
        postStore,
        getStores,
        getStore,
        getStoreProducts,
        getStoresVectorSearch,
        getStoresGoogleMapSearch,
        patchStore,
        deleteStore
    }
}
