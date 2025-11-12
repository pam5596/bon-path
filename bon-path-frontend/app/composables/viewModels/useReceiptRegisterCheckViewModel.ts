export default function() {
    const config = useRuntimeConfig()

    const collection = useState<STATE_TYPES['RECEIPT_REGISTER_CHECK_COLLECTION']>(
        STATE_KEYS.RECEIPT_REGISTER_CHECK_COLLECTION,
        () => ({
            storesSearchResult: [],
            productsSearchResult: []
        })
    )

    const form = useState<STATE_TYPES['RECEIPT_REGISTER_CHECK_FORM']>(
        STATE_KEYS.RECEIPT_REGISTER_CHECK_FORM, 
        () => ({
            purchases: []
        })
    )

    const { data, execute } = renderReceiptRegisterCheck()
    watch(data, 
        (data) => {
            form.value.store = data?.store
            form.value.purchases = data?.purchases || []
            collection.value.storesSearchResult = data?.store.searchResults || []
            collection.value.productsSearchResult = data?.products || []
        },
    )

    const { vector_search_products, onProductVectorSearchDispatch } = onProductVectorSearch()
    const { google_search_products, onProductGoogleMapSearchDispatch } = onProductGoogleSearch()

    watch(form.value.store!, async (store) => {
        if (store.id) {
            collection.value.productsSearchResult = await Promise.all(
                collection.value.productsSearchResult.map(
                    async (product) => {
                        await onProductVectorSearchDispatch.event({
                            keyword: product.getValues.name,
                            storeId: store.id,
                            limit: config.app.defaultLimitOfSearch
                        })
                        await onProductGoogleMapSearchDispatch.event({
                            keyword: `マーケット商品 ${product.getValues.name}`,
                            limit: config.app.defaultLimitOfSearch,
                            price: product.getValues.price
                        })

                        const mergedSearchResults = [
                            ...google_search_products.value,
                            ...vector_search_products.value,
                        ] as ProductModel[]
            
                        return new ProductModel({
                            ...product.getValues,
                            searchResults: mergedSearchResults
                        })
                    }
                )
            )
        }
    })

    const onRemovePurchaseEvent = (index: number) => {
        form.value.purchases = form.value.purchases.filter(
            (_, i) => i !== index
        )
        collection.value.productsSearchResult = 
            collection.value.productsSearchResult.filter(
                (_, i) => i !== index
            )
    }

    const { isLoading: isSubmitting, event } = onSavePurchases()
    const onSavePurchasesEvent = async () => {
        await event({
            store: form.value.store!,
            purchases: form.value.purchases
        })
        form.value = {
            purchases: []
        }
        collection.value = {
            storesSearchResult: [],
            productsSearchResult: []
        }
    }

    return {
        data,
        form,
        collection,
        isSubmitting,
        execute,
        onRemovePurchaseEvent,
        onSavePurchasesEvent
    }
}