import type { CategoryPayloads } from "@@/../share/payloads";

export default function() {
    const config = useRuntimeConfig()

    const postCategories = async (
        payload: CategoryPayloads.POST.Request
    ) => {
        return await $fetch<undefined>(
            `${config.public.apiBase}/categories`, {
                method: 'post',
                body: payload.body,
                credentials: 'include'
            }
        )
    }

    const getCategory = async (
        payload: CategoryPayloads.GET.Request
    ) => {
        return await $fetch<CategoryPayloads.GET.Response['body']>(
            `${config.public.apiBase}/categories/${payload.params.id}`,
            {
                credentials: 'include'
            }
        )
    }

    const getCategoryChildren = async (
        payload: CategoryPayloads.Children.GET.Request
    ) => {
        return await $fetch<CategoryPayloads.Children.GET.Response['body']>(
            `${config.public.apiBase}/categories/${payload.params.parentId}/children`,
            {
                credentials: 'include'
            }
        )
    }

    const getCategoryProducts = async (
        payload: CategoryPayloads.Products.GET.Request
    ) => {
        return await $fetch<CategoryPayloads.Products.GET.Response['body']>(
            `${config.public.apiBase}/categories/${payload.params.categoryId}/products`,
            {
                credentials: 'include'
            }
        )
    }

    const deleteCategory = async (
        payload: CategoryPayloads.DELETE.Request
    ) => {
        return await $fetch<undefined>(
            `${config.public.apiBase}/categories/${payload.params.id}`, {
                method: 'delete',
                credentials: 'include'
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