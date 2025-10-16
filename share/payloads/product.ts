export namespace ProductPayloads {
    export namespace GET {
        export type Request = {
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
            params: {
                id: number
            }
        }
    }

    export namespace Products {
        export namespace GET {
            export type Request = {
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