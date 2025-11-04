export namespace SessionPayloads {
    export namespace Login {
        export namespace GET {
            export type Request = {
                cookies: {
                    loginSessionId: string
                }
            }

            export type Response = {
                body: {
                    userHashId: string
                }
            }
        }

        export namespace POST {
            export type Request = {
                body: {
                    email: string,
                    password: string
                }
            }

            export type Response = {
                cookies: {
                    loginSessionId: string
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
    }

    export namespace Verify {
        export namespace GET {
            export type Request = {
                cookies: {
                    verifySessionId: string
                }
            }

            export type Response = {
                body: {
                    userName: string,
                    userEmail: string,
                    userHashPassword: string
                }
            }
        }

        export namespace POST {
            export type Request = {
                body: {
                    name: string,
                    email: string,
                    password: string
                }
            }

            export type Response = {
                cookies: {
                    verifySessionId: string
                }
            }
        }

        export namespace DELETE {
            export type Request = {
                cookies: {
                    verifySessionId: string
                }
            }
        }
    }
}