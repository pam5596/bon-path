import type { StorePayloads } from "@@/../share/payloads";

export default function() {
    const fetcher = useFetcher()

    const postStore = async (
        payload: StorePayloads.POST.Request
    ) => {
        return await fetcher<StorePayloads.POST.Response['body']>(
            `/stores`, {
                method: 'post',
                body: payload.body,
            }
        )
    }

    const getStores = async (
        payload: StorePayloads.Stores.GET.Request
    ) => {
        return await fetcher<StorePayloads.Stores.GET.Response['body']>(
            `/stores`, {
                query: payload.query,
            }
        )
    }

    const getStore = async (
        payload: StorePayloads.GET.Request
    ) => {
        return await fetcher<StorePayloads.GET.Response['body']>(
            `/stores/${payload.params.id}`
        )
    }

    const getStoreProducts = async (
        payload: StorePayloads.Products.GET.Request
    ) => {
        return await fetcher<StorePayloads.Products.GET.Response['body']>(
            `/stores/${payload.params.storeId}/products`
        )
    }

    const getStoresVectorSearch = async (
        payload: StorePayloads.VectorSearch.GET.Request
    ) => {
        return await fetcher<StorePayloads.VectorSearch.GET.Response['body']>(
            `/stores/vector-search`, {
                query: payload.query,
            }
        )
    }

    const getStoresGoogleMapSearch = async (
        payload: StorePayloads.GoogleMapSearch.GET.Request
    ) => {
        return await fetcher<StorePayloads.GoogleMapSearch.GET.Response['body']>(
            `/stores/google-map-search`, {
                query: payload.query,
            }
        )
    }

    const patchStore = async (
        payload: StorePayloads.PATCH.Request
    ) => {
        return await fetcher<undefined>(
            `/stores/${payload.params.id}`, {
                method: 'patch',
                body: payload.body,
            }
        )
    }

    const deleteStore = async (
        payload: StorePayloads.DELETE.Request
    ) => {
        return await fetcher<undefined>(
            `/stores/${payload.params.id}`, {
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
