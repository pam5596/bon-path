import { verify, sign, decode } from "hono/jwt";
import { SignatureAlgorithm } from "hono/utils/jwt/jwa";
import { VerifyOptionsWithAlg } from "hono/utils/jwt/jwt";
import { JWTPayload } from "hono/utils/jwt/types";

export class HonoJwtClient {
    constructor(
        private secret: string
    ){}

    async verify(
        token: string,
        algOrOptions?: SignatureAlgorithm | VerifyOptionsWithAlg
    ) {
        return await verify(token, this.secret, algOrOptions)
    }

    async sign(
        payload: JWTPayload,
        alg?: SignatureAlgorithm
    ) {
        return await sign(payload, this.secret, alg)
    }

    decode(token: string) {
        return decode(token)
    }
}