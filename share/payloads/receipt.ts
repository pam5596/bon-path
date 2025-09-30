export namespace ReceiptPayloads {
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
                latitude: number,
                longitude: number,
                isChecked: boolean,
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
                longitude: number,
                latitude: number
            }
        }

        export type Response = {
            body: {
                id: number
            }
        }
    }

    export namespace PATCH {
        export type Request = {
            cookies: {
                loginSessionId: string
            },
            params: {
                id: number
            },
            body: {
                isChecked: boolean
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

    export namespace Purchases {
        export namespace GET {
            export type Request = {
                cookies: {
                    loginSessionId: string
                },
                params: {
                    receiptId: number
                }
            }

            export type Response = {
                body: {
                    purchases: {
                        id: number,
                        storeId: number,
                        productId: number,
                        price: number,
                        createdAt: Date
                    }[]
                }
            }
        }
    }

    export namespace Images {
        export namespace GET {
            export type Request = {
                cookies: {
                    loginSessionId: string
                },
                params: {
                    receiptId: number
                }
            }

            export type Response = {
                body: {
                    images: {
                        id: number,
                        url: string,
                        createdAt: Date
                    }[]
                }
            }
        }
    }
}