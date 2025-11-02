import type { ProductPayloads } from "@share/payloads";

export default function () {
    const { getProductsGoogleSearch } = useProducts()
    const google_search_products = ref<ProductModel[]>([])

    return {
        google_search_products,
        onProductGoogleMapSearch: useAsyncOnEvent(
            async (query: ProductPayloads.GoogleSearch.GET.Request['query'] & { price: number }) => {
                const products = await getProductsGoogleSearch({ query })
                google_search_products.value = products.products.map(
                    product => new ProductModel({ ...product, price: query.price })
                )
            }
        )
    }
}