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

            const vectorSearchStores = (await getStoresVectorSearch({
                query: {
                    keyword: ocrResult.store.name,
                    limit: config.public.defaultLimitOfSearch
                }
            })).stores

            const googleSearchStores = (await getStoresGoogleMapSearch({
                query: {
                    keyword: ocrResult.store.name,
                    limit: config.public.defaultLimitOfSearch,
                    latitude: location.value?.latitude,
                    longitude: location.value?.longitude
                }
            })).stores

            const priorityStore = Array.from(
                new Map(
                    [
                        ...googleSearchStores,
                        ...vectorSearchStores,
                    ].map(
                        result => [result.name, result]
                    )
                ).values()
            )[0]

            const searchResultProducts = await Promise.all(
                ocrResult.products.map(
                    async (product) => {
                        const vectorSearchProducts = (await getProductsVectorSearch({
                            query: {
                                    keyword: product.name,
                                    storeId: vectorSearchStores[0]?.id,
                                    limit: config.public.defaultLimitOfSearch
                                }
                            }).catch(()=>({products: [] as Product[]}))
                        ).products

                        const googleSearchProducts = (await getProductsGoogleSearch({
                                query: {
                                    keyword: product.name,
                                    limit: config.public.defaultLimitOfSearch
                                }
                            }).catch(()=>({products: [] as {
                                categoryId: number;
                                name: string;
                                image?: string;
                                link?: string;
                            }[]}))
                        ).products

                        const priority = Array.from(
                            new Map(
                                [
                                    ...googleSearchProducts,
                                    ...vectorSearchProducts,
                                ].map(
                                    result => [result.link, result]
                                )
                            ).values()
                        )[0]

                        return {
                            priority,
                            vector: vectorSearchProducts,
                            google: googleSearchProducts,
                        }
                    }
                )
            )

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
                    ...priorityStore!,
                    searchResults: {
                        vector: vectorSearchStores.map(store => new StoreModel({...store})),
                        google: googleSearchStores.map(store => new StoreModel({...store})),
                    }
                }),
                purchases: ocrResult.products.map(
                    (product, i) => new PurchaseModel({
                        receiptId: receiptId!,
                        price: product.price,
                        quantity: product.quantity,
                        product: new ProductModel({
                            ...(searchResultProducts[i]!.priority!),
                            price: product.price,
                            name: product.name,
                            extractedName: product.name,
                            searchResults: {
                                vector: searchResultProducts[i]!.vector.map(
                                    (result) => ({
                                        id: result.id,
                                        categoryId: result.categoryId,
                                        image: result.image,
                                        link: result.link,
                                        name: result.name
                                    })
                                ),
                                google: searchResultProducts[i]!.google.map(
                                    (result) => ({
                                        categoryId: result.categoryId,
                                        image: result.image,
                                        link: result.link,
                                        name: result.name
                                    })
                                )
                            }
                        })
                    })
                ),
            }
        }
    )
}