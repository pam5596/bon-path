export namespace GptOcrPayloads {
    export namespace POST {
        export type Request = {
            cookies: {
                loginSessionId: string
            },
            body: {
                images: string[]
            }
        }

        export type Response = {
            body: {
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
}