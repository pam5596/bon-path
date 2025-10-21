export namespace StorePayloads {
    export namespace GET {
        export type Request = {
            params: {
                id: number
            }
        }

        export type Response = {
            body: {
                name: string,
                image?: string,
                latitude?: number,
                longitude?: number,
                googleMapLink?: string,
                createdAt: Date
            }
        }
    }


    export namespace POST {
        export type Request = {
            body: {
                name: string
                image?: string
                latitude?: number
                longitude?: number
                googleMapLink?: string
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
            params: {
                id: number
            },
            body: {
                name: string,
                image?: string,
                latitude?: number,
                longitude?: number,
                googleMapLink?: string,
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

    export namespace Stores {
        export namespace GET {
            export type Request = {
                query: {
                    latitude?: number,
                    longitude?: number,
                    radius?: number,
                    limit?: number
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
    }

    export namespace Products {
        export namespace GET {
            export type Request = {
                params: {
                    storeId: number
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

    export namespace VectorSearch {
        export namespace GET {
            export type Request = {
                query: {
                    keyword: string,
                    limit?: number
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
    }

    export namespace GoogleMapSearch {
        export namespace GET {
            export type Request = {
                query: {
                    keyword: string,
                    limit?: number
                }
            }

            export type Response = {
                body: {
                    stores: {
                        name: string,
                        image?: string,
                        latitude?: number,
                        longitude?: number,
                        googleMapLink?: string
                    }[]
                }
            }
        }
    }
}