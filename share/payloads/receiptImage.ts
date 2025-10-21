export namespace ReceiptImagePayloads {
    export namespace POST {
        export type Request = {
            body: {
                receiptId: number,
                images: File[]
            }
        }
    }

    export namespace DELETE {
        export type Request = {
            params: {
                id: number
            }
        }
    }
}