import BaseUseCase from "@usecase/_interface";
import { SessionPayloads } from "@share/payloads";
import { SessionPayloadSchemas } from "../../payloads";
import { HonoJwtClient } from "@client";
import { VerifySessionEntity } from "@models/entity";
import { JWTPayload } from "hono/utils/jwt/types";

export class GetVerifySessionUseCase implements BaseUseCase<
    SessionPayloads.Verify.GET.Request,
    SessionPayloads.Verify.GET.Response
> {
    constructor(
        public clients: { honoJwt: HonoJwtClient },
        public request: SessionPayloadSchemas.Verify.GET.Request
    ){}

    async execute() {
        const jwt_payload = await this.clients.honoJwt.verify(
            this.request.getCookies.verifySessionId
        ) as VerifySessionEntity['toPrimitives'] & JWTPayload

        return new SessionPayloadSchemas.Verify.GET.Response({
            body: {
                userName: jwt_payload.userName,
                userEmail: jwt_payload.userEmail,
                userHashPassword: jwt_payload.userHashPassword
            }
        })
    }
}