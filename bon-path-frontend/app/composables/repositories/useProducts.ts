import type { ProductPayloads } from '@share/payloads'

export default function() {
    const postProducts = async (
        payload: ProductPayloads.POST.Request
    ) => {
        return await $fetch<undefined>(
            `/api/products`, {
                method: 'post',
                body: payload.body
            }
        )
    }

    const getProducts = async (
        payload: ProductPayloads.Products.GET.Request
    ) => {
        return await $fetch<ProductPayloads.Products.GET.Response['body']>(
            `/api/products`, {
                query: payload.query
            }
        )
    }

    const getProduct = async (
        payload: ProductPayloads.GET.Request
    ) => {
        return await $fetch<ProductPayloads.GET.Response['body']>(
            `/api/products/${payload.params.id}`
        )
    }

    const getProductsVectorSearch = async (
        payload: ProductPayloads.VectorSearch.GET.Request
    ) => {
        return await $fetch<ProductPayloads.VectorSearch.GET.Response['body']>(
            `/api/products/vector-search`, {
                query: payload.query
            }
        )
    }

    const getProductsGoogleSearch = async (
        payload: ProductPayloads.GoogleSearch.GET.Request
    ) => {
        return await $fetch<ProductPayloads.GoogleSearch.GET.Response['body']>(
            `/api/products/google-search`, {
                query: payload.query
            }
        )
    }

    const patchProduct = async (
        payload: ProductPayloads.PATCH.Request
    ) => {
        return await $fetch<undefined>(
            `/api/products/${payload.params.id}`, {
                method: 'patch',
                body: payload.body
            }
        )
    }

    const deleteProduct = async (
        payload: ProductPayloads.DELETE.Request
    ) => {
        return await $fetch<undefined>(
            `/api/products/${payload.params.id}`, {
                method: 'delete',
            }
        )
    }

    return {
        postProducts,
        getProducts,
        getProduct,
        getProductsGoogleSearch,
        getProductsVectorSearch,
        patchProduct,
        deleteProduct
    }
}