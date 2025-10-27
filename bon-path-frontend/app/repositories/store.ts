import type { StorePayloads } from "@share/payloads";

export class StoreRepository {
    async post(payload: StorePayloads.POST.Request) {
        return await useAPIFetch<StorePayloads.POST.Response['body']>(
            `/stores`, {
                method: 'post',
                body: payload.body
            }
        )
    }

    async getMany(payload: StorePayloads.Stores.GET.Request) {
        return await useAPIFetch<StorePayloads.Stores.GET.Response['body']>(
            `/stores`, {
                method: 'get',
                query: payload.query
            }
        )
    }

    async get(payload: StorePayloads.GET.Request) {
        return await useAPIFetch<StorePayloads.GET.Response['body']>(
            `/stores/${payload.params.id}`, {
                method: 'get',
            }
        )
    }

    async getProducts(payload: StorePayloads.Products.GET.Request) {
        return await useAPIFetch<StorePayloads.Products.GET.Response['body']>(
            `/stores/${payload.params.storeId}/products`, {
                method: 'get'
            }
        )
    }

    async getVectorSearch(payload: StorePayloads.VectorSearch.GET.Request) {
        return await useAPIFetch<StorePayloads.VectorSearch.GET.Response['body']>(
            `/stores/vector-search`, {
                method: 'get',
                query: payload.query
            }
        )
    }

    async getGoogleMapSearch(payload: StorePayloads.GoogleMapSearch.GET.Request) {
        return await useAPIFetch<StorePayloads.GoogleMapSearch.GET.Response['body']>(
            `/stores/google-map-search`, {
                method: 'get',
                query: payload.query
            }
        )
    }

    async patch(payload: StorePayloads.PATCH.Request) {
        return await useAPIFetch<undefined>(
            `/stores/${payload.params.id}`, {
                method: 'patch',
                body: payload.body
            }
        )
    }

    async delete(payload: StorePayloads.DELETE.Request) {
        return await useAPIFetch<undefined>(
            `/stores/${payload.params.id}`, {
                method: 'delete',
            }
        )
    }
}