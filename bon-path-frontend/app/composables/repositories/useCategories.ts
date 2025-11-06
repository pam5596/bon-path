import type { CategoryPayloads } from "@share/payloads";

export default function() {
    const postCategories = async (
        payload: CategoryPayloads.POST.Request
    ) => {
        return await $fetch<undefined>(
            `/api/categories`, {
                method: 'post',
                body: payload.body
            }
        )
    }

    const getCategory = async (
        payload: CategoryPayloads.GET.Request
    ) => {
        return await $fetch<CategoryPayloads.GET.Response['body']>(
            `/api/categories/${payload.params.id}`
        )
    }

    const getCategoryChildren = async (
        payload: CategoryPayloads.Children.GET.Request
    ) => {
        return await $fetch<CategoryPayloads.Children.GET.Response['body']>(
            `/api/categories/${payload.params.parentId}/children`
        )
    }

    const getCategoryProducts = async (
        payload: CategoryPayloads.Products.GET.Request
    ) => {
        return await $fetch<CategoryPayloads.Products.GET.Response['body']>(
            `/api/categories/${payload.params.categoryId}/products`
        )
    }

    const deleteCategory = async (
        payload: CategoryPayloads.DELETE.Request
    ) => {
        return await $fetch<undefined>(
            `/api/categories/${payload.params.id}`, {
                method: 'delete'
            }
        )
    }

    return {
        postCategories,
        getCategory,
        getCategoryChildren,
        getCategoryProducts,
        deleteCategory
    }
}