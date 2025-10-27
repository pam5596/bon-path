import type { CategoryPayloads } from "@share/payloads";

export class CategoryRepository {
    async post(payload: CategoryPayloads.POST.Request) {
        return await useAPIFetch<undefined>(
            `/categories`, {
                method: 'post',
                body: payload.body
            }
        )
    }

    async get(payload: CategoryPayloads.GET.Request) {
        return await useAPIFetch<CategoryPayloads.GET.Response['body']>(
            `/categories/${payload.params.id}`, {
                method: 'get'
            }
        )
    }

    async getChildren(payload: CategoryPayloads.Children.GET.Request) {
        return await useAPIFetch<CategoryPayloads.Children.GET.Response['body']>(
            `/categories/${payload.params.parentId}/children`, {
                method: 'get'
            }
        )
    }

    async getProducts(payload: CategoryPayloads.Products.GET.Request) {
        return await useAPIFetch<CategoryPayloads.Products.GET.Response['body']>(
            `/categories/${payload.params.categoryId}/products`, {
                method: 'get'
            }
        )
    }

    async delete(payload: CategoryPayloads.DELETE.Request) {
        return await useAPIFetch<undefined>(
            `/categories/${payload.params.id}`, {
                method: 'delete'
            }
        )
    }
}