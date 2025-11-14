import type { ProductPayloads } from '@@/../share/payloads'

export default function() {
    const fetcher = useFetcher()
    
    const postProduct = async (
        payload: ProductPayloads.POST.Request
    ) => {
        return await fetcher<ProductPayloads.POST.Response['body']>(
            `/products`, {
                method: 'post',
                body: payload.body,
            }
        )
    }

    const getProducts = async (
        payload: ProductPayloads.Products.GET.Request
    ) => {
        return await fetcher<ProductPayloads.Products.GET.Response['body']>(
            `/products`, {
                query: payload.query,
            }
        )
    }

    const getProduct = async (
        payload: ProductPayloads.GET.Request
    ) => {
        return await fetcher<ProductPayloads.GET.Response['body']>(
            `/products/${payload.params.id}`
        )
    }

    const getProductsVectorSearch = async (
        payload: ProductPayloads.VectorSearch.GET.Request
    ) => {
        return await fetcher<ProductPayloads.VectorSearch.GET.Response['body']>(
            `/products/vector-search`, {
                query: payload.query,
            }
        )
    }

    const getProductsGoogleSearch = async (
        payload: ProductPayloads.GoogleSearch.GET.Request
    ) => {
        return await fetcher<ProductPayloads.GoogleSearch.GET.Response['body']>(
            `/products/google-search`, {
                query: payload.query,
            }
        )
    }

    const patchProduct = async (
        payload: ProductPayloads.PATCH.Request
    ) => {
        return await fetcher<undefined>(
            `/products/${payload.params.id}`, {
                method: 'patch',
                body: payload.body,
            }
        )
    }

    const deleteProduct = async (
        payload: ProductPayloads.DELETE.Request
    ) => {
        return await fetcher<undefined>(
            `/products/${payload.params.id}`, {
                method: 'delete',
            }
        )
    }

    return {
        postProduct,
        getProducts,
        getProduct,
        getProductsGoogleSearch,
        getProductsVectorSearch,
        patchProduct,
        deleteProduct
    }
}