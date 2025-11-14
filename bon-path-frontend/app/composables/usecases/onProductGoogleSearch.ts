import type { ProductPayloads } from "@@/../share/payloads";

export default function () {
    const { getProductsGoogleSearch } = useProducts()
    const google_search_products = ref<ProductModel[]>([])

    return {
        google_search_products,
        onProductGoogleMapSearchDispatch: useAsyncOnEvent(
            async (query: ProductPayloads.GoogleSearch.GET.Request['query'] & { price: number }) => {
                const products = await getProductsGoogleSearch({ query: {
                    keyword: query.keyword,
                    limit: query.limit
                }})
                google_search_products.value = products.products.map(
                    product => new ProductModel({ ...product, price: query.price })
                )
            }
        )
    }
}