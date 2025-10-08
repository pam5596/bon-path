export namespace PurchasePayloads {
    export namespace GET {
        export type Request = {
            cookies: {
                loginSessionId: string
            },
            params: {
                id: number
            }
        }

        export type Response = {
            body: {
                receiptId: number,
                storeId: number,
                productId: number,
                price: number,
                quantity: number,
                createdAt: Date
            }
        }
    }

    export namespace POST {
        export type Request = {
            cookies: {
                loginSessionId: string
            },
            body: {
                purchases: {
                    receiptId: number,
                    storeId: number,
                    productId: number,
                    price: number,
                    quantity: number
                }[]
            }
        }
    }

    export namespace DELETE {
        export type Request = {
            cookies: {
                loginSessionId: string
            },
            params: {
                id: number
            }
        }
    }
}