export namespace GptOcrPayloads {
    export namespace POST {
        export type Request = {
            cookies: {
                loginSessionId: string
            },
            formData: {
                images: File[]
            }
        }

        export type Response = {
            store: {
                name: string
            },
            products: {
                name: string,
                price: number,
                quantity: number
            }[]
        }
    }
}