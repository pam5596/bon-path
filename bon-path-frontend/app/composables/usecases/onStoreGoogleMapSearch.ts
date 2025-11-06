import type { StorePayloads } from "@share/payloads";

export default function () {
    const { getStoresGoogleMapSearch } = useStores()
    const google_search_stores = ref<StoreModel[]>([])

    return {
        google_search_stores,
        onStoreGoogleMapSearch: useAsyncOnEvent(
            async (query: StorePayloads.GoogleMapSearch.GET.Request['query']) => {
                const stores = await getStoresGoogleMapSearch({ query })
                google_search_stores.value = stores.stores.map(
                    store => new StoreModel(store)
                )
            }
        )
    }
}