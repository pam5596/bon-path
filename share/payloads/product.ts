export namespace ProductPayloads {
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
                storeId: number,
                categoryId: number,
                name: string,
                image?: string,
                link?: string,
                price: number,
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
                products: {
                    storeId: number,
                    categoryId: number,
                    name: string,
                    image?: string,
                    link?: string,
                    price: number
                }[]
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
                categoryId: number,
                name: string,
                image?: string,
                link?: string,
                price: number
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

    export namespace Products {
        export namespace GET {
            export type Request = {
                cookies: {
                    loginSessionId: string
                },
                query: {
                    sort?: 'price',
                    orderBy?: 'asc' | 'desc',
                    limit?: number
                }
            }
    
            export type Response = {
                body: {
                    products: {
                        id: number,
                        storeId: number,
                        categoryId: number,
                        name: string,
                        image?: string,
                        link?: string,
                        price: number,
                        createdAt: Date
                    }[]
                }
            }
        }
    }

    export namespace VectorSearch {
        export namespace GET {
            export type Request = {
                cookies: {
                    loginSessionId: string
                },
                query: {
                    keyword: string,
                    storeId: number,
                    limit?: number
                }
            }
    
            export type Response = {
                body: {
                    products: {
                        id: number,
                        storeId: number,
                        categoryId: number,
                        name: string,
                        image?: string,
                        link?: string,
                        price: number,
                        createdAt: Date
                    }[]
                }
            }
        }
    }

    export namespace GoogleSearch {
        export namespace GET {
            export type Request = {
                cookies: {
                    loginSessionId: string
                },
                query: {
                    keyword: string,
                    limit?: number
                }
            }
    
            export type Response = {
                body: {
                    products: {
                        categoryId: number,
                        name: string,
                        image?: string,
                        link?: string
                    }[]
                }
            }
        }
    }
}