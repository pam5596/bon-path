export namespace CategoryPayloads {
    export namespace GET {
        export type Request = {
            params: {
                id: number
            }
        }

        export type Response = {
            body: {
                parentId?: number,
                name: string
            }
        }
    }

    export namespace POST {
        export type Request = {
            body: {
                categories: {
                    parentId?: number,
                    name: string
                }[]
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

    export namespace Children {
        export namespace GET {
            export type Request = {
                params: {
                    parentId: number
                }
            }
    
            export type Response = {
                body: {
                    categories: {
                        id: number,
                        parentId?: number,
                        name: string
                    }[]
                }
            }
        }
    }

    export namespace Products {
        export namespace GET {
            export type Request = {
                params: {
                    categoryId: number
                }
            }
    
            export type Response = {
                body: {
                    products: {
                        id: number,
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
}