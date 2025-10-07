import { verify, sign, decode } from "hono/jwt";
import { SignatureAlgorithm } from "hono/utils/jwt/jwa";
import { VerifyOptionsWithAlg } from "hono/utils/jwt/jwt";
import { JWTPayload } from "hono/utils/jwt/types";
import { LoginSessionType, VerifySessionType } from "@models/entity";

export class HonoJwtClient {
    constructor(
        private secret: string
    ){}

    async verify(
        token: string,
        algOrOptions?: SignatureAlgorithm | VerifyOptionsWithAlg
    ) {
        return await verify(token, this.secret, algOrOptions) as 
            LoginSessionType & JWTPayload | VerifySessionType & JWTPayload
    }

    async sign(
        payload: LoginSessionType & JWTPayload | VerifySessionType & JWTPayload,
        alg?: SignatureAlgorithm
    ) {
        return await sign(payload, this.secret, alg)
    }

    decode(token: string) {
        return decode(token)
    }
}