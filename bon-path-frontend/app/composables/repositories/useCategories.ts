import type { CategoryPayloads } from "@@/../share/payloads";

export default function() {
    const fetcher = useFetcher()

    const postCategories = async (
        payload: CategoryPayloads.POST.Request
    ) => {
        return await fetcher<undefined>(
            `/categories`, {
                method: 'post',
                body: payload.body,
            }
        )
    }

    const getCategory = async (
        payload: CategoryPayloads.GET.Request
    ) => {
        return await fetcher<CategoryPayloads.GET.Response['body']>(
            `/categories/${payload.params.id}`
        )
    }

    const getCategoryChildren = async (
        payload: CategoryPayloads.Children.GET.Request
    ) => {
        return await fetcher<CategoryPayloads.Children.GET.Response['body']>(
            `/categories/${payload.params.parentId}/children`
        )
    }

    const getCategoryProducts = async (
        payload: CategoryPayloads.Products.GET.Request
    ) => {
        return await fetcher<CategoryPayloads.Products.GET.Response['body']>(
            `/categories/${payload.params.categoryId}/products`
        )
    }

    const deleteCategory = async (
        payload: CategoryPayloads.DELETE.Request
    ) => {
        return await fetcher<undefined>(
            `/categories/${payload.params.id}`, {
                method: 'delete',
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