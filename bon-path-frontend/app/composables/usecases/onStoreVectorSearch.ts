import type { StorePayloads } from "@share/payloads";

export default function () {
    const { getStoresVectorSearch } = useStores()
    const vector_search_stores = ref<StoreModel[]>([])

    return {
        vector_search_stores,
        onStoreVectorSearch: useAsyncOnEvent(
            async (query: StorePayloads.VectorSearch.GET.Request['query']) => {
                const stores = await getStoresVectorSearch({ query })
                vector_search_stores.value = stores.stores.map(
                    store => new StoreModel(store)
                )
            }
        )
    }
}