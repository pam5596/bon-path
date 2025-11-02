export default function () {
    const { postStore } = useStores()
    // const { postProduct } = useProducts()
    const { postPurchases } = usePurchases()

    const store = ref<StoreModel>()
    const purchases = ref<PurchaseModel[]>([])

    return useAsyncOnEvent(
        async (params: {
            store: StoreModel,
            purchases: PurchaseModel[]
        }) => {
            store.value = params.store
            purchases.value = params.purchases

            if (!params.store.id) {
                const { id: storeId } = await postStore({
                    body: params.store.getValues
                })
                store.value = new StoreModel({
                    id: storeId,
                    ...params.store.getValues
                })
            }

            if (params.purchases.some(purchase => purchase.product!.id)) {
                purchases.value = await Promise.all(
                    params.purchases.map(
                        async (purchase) => {
                            if (!purchase.product!.id) {
                                // [TODO]: [POST] /productを叩き、単体で追加＆ID取得を行う
                                const { id: productId } = { id: 1 }
                                return new PurchaseModel({
                                    ...purchase.getValues,
                                    storeId: store.value!.id!,
                                    product: new ProductModel({
                                        ...purchase.product!.getValues,
                                        id: productId,
                                        storeId: store.value?.id
                                    })
                                })
                            } else {
                                return new PurchaseModel({
                                    ...purchase.getValues,
                                    storeId: store.value!.id!
                                })
                            }
                        }
                    )
                )
            }

            await postPurchases({
                body: { purchases: purchases.value.map(
                    purchase => purchase.getValues
                ) }
            })
        }
    )
}