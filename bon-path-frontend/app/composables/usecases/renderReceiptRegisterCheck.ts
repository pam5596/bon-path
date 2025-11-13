export default function() {
    const config = useRuntimeConfig()
    const { receiptId } = useIdParams(['receiptId'])
    const { location, getLocation } = useGeoLocation()
    const { getReceipt, getReceiptImages } = useReceipts()
    const { getStoresGoogleMapSearch, getStoresVectorSearch } = useStores()
    const { getProductsGoogleSearch, getProductsVectorSearch } = useProducts()
    const { postGptOcr } = useGptOcr()

    return useAsyncOnRender(
        'render-receipt-register-check-usecase',
        async () => {
            getLocation()
            const receipt = await getReceipt({ params: { id: receiptId! }})
            const receiptImages = await getReceiptImages({ params: { receiptId: receiptId! }})
            const ocrResult = await postGptOcr({ body: {
                images: receiptImages.images.map(image => image.url)
            }})

            const googleSearchStores = await getStoresGoogleMapSearch({
                query: {
                    keyword: ocrResult.store.name,
                    limit: config.app.defaultLimitOfSearch,
                    latitude: location.value?.latitude,
                    longitude: location.value?.longitude
                }
            })

            const vectorSearchStores = await getStoresVectorSearch({
                query: {
                    keyword: ocrResult.store.name,
                    limit: config.app.defaultLimitOfSearch
                }
            })

            const searchResultStores = Array.from(
                new Map(
                    [
                        ...googleSearchStores.stores,
                        ...vectorSearchStores.stores,
                    ].map(
                        store => [store.name, store]
                    )
                ).values()
            )

            const searchResultProducts = await Promise.all(
                ocrResult.products.map(
                    async (product) => ({
                        ...product,
                        searchResults: Array.from(
                            new Map([
                                ...(await getProductsGoogleSearch({
                                    query: {
                                        keyword: product.name,
                                        limit: config.app.defaultLimitOfSearch
                                    }
                                }).catch(()=>({ products: []}))).products,
                                ...(await getProductsVectorSearch({
                                    query: {
                                        keyword: product.name,
                                        storeId: (searchResultStores[0] as { id?: number }).id || undefined,
                                        limit: config.app.defaultLimitOfSearch
                                    }
                                }).catch(()=>({ products: []}))).products
                            ].map(
                                product => [product.name, product]
                            )).values()
                        )
                    })
                )
            )

            return {
                receipt: new ReceiptModel({
                    ...receipt,
                    createdAt: new Date(receipt.createdAt),
                    images: receiptImages.images.map(
                        image => new ReceiptImageModel({
                            ...image,
                            url: `/source${image.url}`
                        })
                    )
                }),
                store: new StoreModel({
                    ...searchResultStores[0]!,
                    searchResults: searchResultStores.map(
                        result => new StoreModel(result)
                    )
                }),
                products: searchResultProducts.map(
                    product => new ProductModel({
                        ...product,
                        categoryId: 1,
                        searchResults: product.searchResults.map(
                            result => new ProductModel({
                                ...result,
                                price: product.price
                            })
                        )
                    })
                ),
                purchases: searchResultProducts.map(
                    product => new PurchaseModel({
                        receiptId: receiptId!,
                        price: product.price,
                        quantity: product.quantity,
                        product: new ProductModel({
                            ...product.searchResults[0]!,
                            price: product.price
                        })
                    })
                ),
            }
        }
    )
}