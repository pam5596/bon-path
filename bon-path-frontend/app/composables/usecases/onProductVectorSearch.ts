import type { ProductPayloads } from "@@/../share/payloads";

export default function () {
    const { getProductsVectorSearch } = useProducts()
    const vector_search_products = ref<ProductModel[]>([])

    return {
        vector_search_products,
        onProductVectorSearch: useAsyncOnEvent(
            async (query: ProductPayloads.VectorSearch.GET.Request['query']) => {
                const products = await getProductsVectorSearch({ query })
                vector_search_products.value = products.products.map(
                    product => new ProductModel(product)
                )
            }
        )
    }
}