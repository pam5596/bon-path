export default function () {
    const { receiptId } = useIdParams(['receiptId'])
    const { postStore } = useStores()
    const { postProduct } = useProducts()
    const { postPurchases } = usePurchases()
    const { patchReceipt } = useReceipts()

    const payloadStore = ref<StoreModel>()
    const payloadPurchases = ref<PurchaseModel[]>([])

    return useAsyncOnEvent(
        async (params: {
            store: StoreModel,
            purchases: PurchaseModel[]
        }) => {
            payloadStore.value = params.store
            payloadPurchases.value = params.purchases

            if (!params.store.id) {
                const { id: storeId } = await postStore({
                    body: params.store.getModelValues
                })
                payloadStore.value = new StoreModel({
                    id: storeId,
                    ...params.store.getModelValues
                })
            }

            payloadPurchases.value = await Promise.all(
                params.purchases.map(
                    async (purchase) => {
                        if (!purchase.product.id) {
                            const { id: productId } = await postProduct({ 
                                body: {
                                    categoryId: 1,
                                    ...purchase.product.getModelValues,
                                    storeId: payloadStore.value!.id!,
                                }
                            })

                            return new PurchaseModel({
                                ...purchase.getValues,
                                productId,
                                product: new ProductModel({
                                    categoryId: 1,
                                    ...purchase.product.getModelValues,
                                    id: productId,
                                    storeId: payloadStore.value!.id
                                })
                            })
                        } else {
                            return purchase
                        }
                    }
                )
            )

            await postPurchases({
                body: { 
                    purchases: payloadPurchases.value.filter(
                        purchase => !purchase.id
                    ).map(
                        purchase => ({
                            ...purchase.getModelValues,
                            storeId: payloadStore.value!.id!,
                            productId: purchase.product.id!
                        })
                    )
                }
            })

            await patchReceipt({
                body: { isChecked: true },
                params: { id: receiptId! }
            })

            navigateTo(`/purchase-history/stores/${payloadStore.value?.id}/receipts/${receiptId}`)
        }
    )
}