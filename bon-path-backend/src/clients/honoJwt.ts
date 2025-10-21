import { ERROR_MESSAGES } from "@lib/constants/errorMessages";
import { ClientError } from "@lib/error";
import { verify, sign, decode } from "hono/jwt";
import { SignatureAlgorithm } from "hono/utils/jwt/jwa";
import { VerifyOptionsWithAlg } from "hono/utils/jwt/jwt";
import { JWTPayload, JwtTokenInvalid } from "hono/utils/jwt/types";

export class HonoJwtClient {
    constructor(
        private secret: string
    ){}

    async verify(
        token: string,
        algOrOptions?: SignatureAlgorithm | VerifyOptionsWithAlg
    ) {
        try {
            return await verify(token, this.secret, algOrOptions)
        } catch(e) {
            if (e instanceof  JwtTokenInvalid) {
                throw new ClientError(
                    401,
                    ERROR_MESSAGES.client.honoJwt,
                    e.message,
                    this.constructor.name,
                    'verify',
                    token
                )
            } else {
                throw e
            }
        }
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