import type { ProductPayloads } from '@@/../share/payloads'

export default function() {
    const config = useRuntimeConfig()
    
    const postProduct = async (
        payload: ProductPayloads.POST.Request
    ) => {
        return await $fetch<ProductPayloads.POST.Response['body']>(
            `${config.public.apiBase}/products`, {
                method: 'post',
                body: payload.body,
                credentials: 'include'
            }
        )
    }

    const getProducts = async (
        payload: ProductPayloads.Products.GET.Request
    ) => {
        return await $fetch<ProductPayloads.Products.GET.Response['body']>(
            `${config.public.apiBase}/products`, {
                query: payload.query,
                credentials: 'include'
            }
        )
    }

    const getProduct = async (
        payload: ProductPayloads.GET.Request
    ) => {
        return await $fetch<ProductPayloads.GET.Response['body']>(
            `${config.public.apiBase}/products/${payload.params.id}`,
            {
                credentials: 'include'
            }
        )
    }

    const getProductsVectorSearch = async (
        payload: ProductPayloads.VectorSearch.GET.Request
    ) => {
        return await $fetch<ProductPayloads.VectorSearch.GET.Response['body']>(
            `${config.public.apiBase}/products/vector-search`, {
                query: payload.query,
                credentials: 'include'
            }
        )
    }

    const getProductsGoogleSearch = async (
        payload: ProductPayloads.GoogleSearch.GET.Request
    ) => {
        return await $fetch<ProductPayloads.GoogleSearch.GET.Response['body']>(
            `${config.public.apiBase}/products/google-search`, {
                query: payload.query,
                credentials: 'include'
            }
        )
    }

    const patchProduct = async (
        payload: ProductPayloads.PATCH.Request
    ) => {
        return await $fetch<undefined>(
            `${config.public.apiBase}/products/${payload.params.id}`, {
                method: 'patch',
                body: payload.body,
                credentials: 'include'
            }
        )
    }

    const deleteProduct = async (
        payload: ProductPayloads.DELETE.Request
    ) => {
        return await $fetch<undefined>(
            `${config.public.apiBase}/products/${payload.params.id}`, {
                method: 'delete',
                credentials: 'include'
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