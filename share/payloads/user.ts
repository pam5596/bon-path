export namespace UserPayloads {
    export namespace GET {
        export type Request = {
            cookies: {
                loginSessionId: string
            }
        }

        export type Response = {
            body: {
                name: string,
                email: string,
                createdAt: Date
            }
        }
    }

    export namespace POST {
        export type Request = {
            cookies: {
                verifySessionId: string
            }
        }

        export type Response = {
            body: {
                hashedId: string
            }
        }
    }

    export namespace PATCH {
        export type Request = {
            cookies: {
                loginSessionId: string
            },
            body: {
                name: string,
                email: string
            }
        }
    }

    export namespace DELETE {
        export type Request = {
            cookies: {
                loginSessionId: string
            }
        }
    }

    export namespace Receipts {
        export namespace GET {
            export type Request = {
                cookies: {
                    loginSessionId: string
                },
                query: {
                    isChecked?: boolean
                }
            }

            export type Response = {
                body: {
                    receipts: {
                        id: number,
                        latitude: number,
                        longitude: number,
                        isChecked: boolean,
                        createdAt: Date
                    }[]
                }
            }
        }
    }

    export namespace Purchases {
        export namespace GET {
            export type Request = {
                cookies: {
                    loginSessionId: string
                }
            }

            export type Response = {
                body: {
                    purchases: {
                        id: number,
                        receiptId: number,
                        storeId: number,
                        productId: number,
                        price: number,
                        quantity: number,
                        createdAt: Date
                    }[]
                }
            }
        }

        export namespace Stores {
            export namespace GET {
                export type Request = {
                    cookies: {
                        loginSessionId: string
                    }
                }
    
                export type Response = {
                    body: {
                        stores: {
                            id: number,
                            name: string,
                            image?: string,
                            latitude?: number,
                            longitude?: number,
                            googleMapLink?: string,
                            createdAt: Date
                        }[]
                    }
                }
            }

            export namespace Receipts {
                export namespace GET {
                    export type Request = {
                        cookies: {
                            loginSessionId: string
                        },
                        params: {
                            storeId: number
                        }
                    }

                    export type Response = {
                        body: {
                            receipts: {
                                id: number,
                                latitude: number,
                                longitude: number,
                                isChecked: boolean,
                                createdAt: Date
                            }[]
                        }
                    }
                }
            }
        }
    }
}