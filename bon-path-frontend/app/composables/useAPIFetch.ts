import type { ServerError } from "~/models"

export const useAPIFetch = async <ResponseT>(
    request:  Parameters<typeof useFetch>[0],
    options?:  Parameters<typeof useFetch>[1]
) => {
    return await useFetch<ResponseT, ServerError>(
        request,
        {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            ...(options as any),
            baseURL: process.env.BACKEND_DOMAIN,
        }
    )
}