import type { StorePayloads } from "@@/../share/payloads";

export default function() {
    const postStore = async (
        payload: StorePayloads.POST.Request
    ) => {
        return await $fetch<StorePayloads.POST.Response['body']>(
            '/api/stores', {
                method: 'post',
                body: payload.body
            }
        )
    }

    const getStores = async (
        payload: StorePayloads.Stores.GET.Request
    ) => {
        return await $fetch<StorePayloads.Stores.GET.Response['body']>(
            `/api/stores`, {
                query: payload.query
            }
        )
    }

    const getStore = async (
        payload: StorePayloads.GET.Request
    ) => {
        return await $fetch<StorePayloads.GET.Response['body']>(
            `/api/stores/${payload.params.id}`
        )
    }

    const getStoreProducts = async (
        payload: StorePayloads.Products.GET.Request
    ) => {
        return await $fetch<StorePayloads.Products.GET.Response['body']>(
            `/api/stores/${payload.params.storeId}/products`
        )
    }

    const getStoresVectorSearch = async (
        payload: StorePayloads.VectorSearch.GET.Request
    ) => {
        return await $fetch<StorePayloads.VectorSearch.GET.Response['body']>(
            `/api/stores/vector-search`, {
                query: payload.query
            }
        )
    }

    const getStoresGoogleMapSearch = async (
        payload: StorePayloads.GoogleMapSearch.GET.Request
    ) => {
        return await $fetch<StorePayloads.GoogleMapSearch.GET.Response['body']>(
            `/api/stores/google-map-search`, {
                query: payload.query
            }
        )
    }

    const patchStore = async (
        payload: StorePayloads.PATCH.Request
    ) => {
        return await $fetch<undefined>(
            `/api/stores/${payload.params.id}`, {
                method: 'patch',
                body: payload.body
            }
        )
    }

    const deleteStore = async (
        payload: StorePayloads.DELETE.Request
    ) => {
        return await $fetch<undefined>(
            `/api/stores/${payload.params.id}`, {
                method: 'delete',
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
