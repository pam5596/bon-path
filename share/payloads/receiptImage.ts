export namespace ReceiptImagePayloads {
    export namespace POST {
        export type Request = {
            cookies: {
                loginSessionId: string
            },
            formData: {
                receiptId: number,
                images: File[]
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