export default function() {
    const config = useRuntimeConfig()
    const form = useState<STATE_TYPES['RECEIPT_REGISTER_CHECK_FORM']>(
        STATE_KEYS.RECEIPT_REGISTER_CHECK_FORM, 
        () => ({
            purchases: []
        })
    )
    
    const { data, execute } = renderReceiptRegisterCheck()

    const { vector_search_products, onProductVectorSearchDispatch } = onProductVectorSearch()
    const { google_search_products, onProductGoogleMapSearchDispatch } = onProductGoogleSearch()
    const onSearchProductEvent = async (index: number) => {
        if (form.value.purchases[index]) {
            await onProductVectorSearchDispatch.event({
                keyword: form.value.purchases[index].product.getValues.name,
                storeId: form.value.store?.id,
                limit: config.public.defaultLimitOfSearch
            })
            await onProductGoogleMapSearchDispatch.event({
                keyword: form.value.purchases[index].product.getValues.name,
                limit: config.public.defaultLimitOfSearch,
                price: form.value.purchases[index].getValues.price
            })
    
            const searchResultProducts = Array.from(
                new Map(
                    [
                        ...google_search_products.value,
                        ...vector_search_products.value,
                    ].map(
                        product => [product.getValues.image, product]
                    )
                ).values()
            ) as ProductModel[]
    
            form.value.purchases[index] = new PurchaseModel({
                ...form.value.purchases[index].getValues,
                product: new ProductModel({
                    ...searchResultProducts[0]!.getValues,
                    name: form.value.purchases[index].product.getValues.name,
                    price: form.value.purchases[index].product.getValues.price,
                    searchResults: searchResultProducts.map(
                        result => ({
                            categoryId: result.getValues.categoryId!,
                            name: result.getValues.name,
                            image: result.getValues.image,
                            link: result.getValues.link
                        })
                    )
                })
            })
        }
    }

    const onRemovePurchaseEvent = (index: number) => {
        form.value.purchases = form.value.purchases.filter(
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
    }

    watch(form.value.store!, async (store) => {
        if (store.id) {
            await Promise.all(
                form.value.purchases.map(
                    async (_, i) => await onSearchProductEvent(i)
                )
            )
        }
    })

    return {
        data,
        form,
        isSubmitting,
        execute,
        onRemovePurchaseEvent,
        onSearchProductEvent,
        onSavePurchasesEvent
    }
}