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
            
            // [FIXIT] OCRの連投を避けるためにサンプルデータを用意
            // const ocrResult = {
            //     store: {
            //         name: "ファミリーマート 三田聖坂下店"
            //     },
            //     products: [
            //         {
            //             name: "ヤクルトY1000",
            //             price: 162,
            //             quantity: 1
            //         },
            //         {
            //             name: "えびマヨおにぎり",
            //             price: 258,
            //             quantity: 1
            //         },
            //         {
            //             name: "あじの塩焼き",
            //             price: 329,
            //             quantity: 1,
            //         }
            //     ]
            // }

            const googleSearchStores = await getStoresGoogleMapSearch({
                query: {
                    keyword: ocrResult.store.name,
                    limit: config.public.defaultLimitOfSearch,
                    latitude: location.value?.latitude,
                    longitude: location.value?.longitude
                }
            })

            const vectorSearchStores = await getStoresVectorSearch({
                query: {
                    keyword: ocrResult.store.name,
                    limit: config.public.defaultLimitOfSearch
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
            ) as Store[]

            const searchResultProducts = await Promise.all(
                ocrResult.products.map(
                    async (product) => Array.from(
                        new Map([
                                ...(await getProductsGoogleSearch({
                                        query: {
                                            keyword: product.name,
                                            limit: config.public.defaultLimitOfSearch
                                        }
                                    })
                                ).products,
                                ...(await getProductsVectorSearch({
                                    query: {
                                        keyword: product.name,
                                        storeId: searchResultStores[0]?.id,
                                        limit: config.public.defaultLimitOfSearch
                                        }
                                    })
                                ).products
                            ].map(
                                product => [product.image, product]
                            )
                        ).values()
                    )
                )
            ) as Product[][]

            return {
                receipt: new ReceiptModel({
                    ...receipt,
                    createdAt: new Date(receipt.createdAt),
                    images: receiptImages.images.map(
                        image => new ReceiptImageModel({
                            ...image,
                            url: `${config.public.sourceBase}${image.url}`
                        })
                    )
                }),
                store: new StoreModel({
                    ...searchResultStores[0]!,
                    searchResults: searchResultStores.map(
                        result => new StoreModel(result)
                    )
                }),
                purchases: ocrResult.products.map(
                    (product, i) => new PurchaseModel({
                        receiptId: receiptId!,
                        price: product.price,
                        quantity: product.quantity,
                        product: new ProductModel({
                            name: product.name,
                            price: product.price,
                            image: searchResultProducts[i]![0]?.image,
                            searchResults: searchResultProducts[i]?.map(
                                (results) => ({
                                    categoryId: results.categoryId,
                                    image: results.image,
                                    link: results.link
                                })
                            )
                        })
                    })
                ),
            }
        }
    )
}