import type { ProductPayloads } from '@share/payloads'

export class ProductRepository {
    async post(payload: ProductPayloads.POST.Request) {
        return await useAPIFetch<undefined>(
            `/products`, {
                method: 'post',
                body: payload.body
            }
        )
    }

    async getMany(payload: ProductPayloads.Products.GET.Request) {
        return await useAPIFetch<ProductPayloads.Products.GET.Response['body']>(
            `/products`, {
                method: 'get',
                query: payload.query
            }
        )
    }

    async get(payload: ProductPayloads.GET.Request) {
        return await useAPIFetch<ProductPayloads.GET.Response['body']>(
            `/products/${payload.params.id}`, {
                method: 'get'
            }
        )
    }

    async getVectorSearch(payload: ProductPayloads.VectorSearch.GET.Request) {
        return await useAPIFetch<ProductPayloads.VectorSearch.GET.Response['body']>(
            `/products/vector-search`, {
                method: 'get',
                query: payload.query
            }
        )
    }

    async getGoogleSearch(payload: ProductPayloads.GoogleSearch.GET.Request) {
        return await useAPIFetch<ProductPayloads.GoogleSearch.GET.Response['body']>(
            `/products/google-search`, {
                method: 'get',
                query: payload.query
            }
        )
    }

    async patch(payload: ProductPayloads.PATCH.Request) {
        return await useAPIFetch<undefined>(
            `/products/${payload.params.id}`, {
                method: 'patch',
                body: payload.body
            }
        )
    }

    async delete(payload: ProductPayloads.DELETE.Request) {
        return await useAPIFetch<undefined>(
            `/products/${payload.params.id}`, {
                method: 'delete',
            }
        )
    }
}