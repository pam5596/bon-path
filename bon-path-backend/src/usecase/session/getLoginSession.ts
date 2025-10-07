import BaseUseCase from "@usecase/_interface";
import { SessionPayloads } from "@share/payloads";
import { SessionPayloadSchemas } from "../../payloads";
import { HonoJwtClient } from "@client";
import { LoginSessionEntity } from "@models/entity";
import { JWTPayload } from "hono/utils/jwt/types";

export class GetLoginSessionUseCase implements BaseUseCase<
    SessionPayloads.Login.GET.Request,
    SessionPayloads.Login.GET.Response
> {
    constructor(
        public clients: { honoJwt: HonoJwtClient },
        public request: SessionPayloadSchemas.Login.GET.Request
    ){}

    async execute() {
        const jwt_payload = await this.clients.honoJwt.verify(
            this.request.getCookies.loginSessionId
        ) as LoginSessionEntity['toPrimitives'] & JWTPayload

        return new SessionPayloadSchemas.Login.GET.Response({
            body: {
                userHashId: jwt_payload.userHashId
            }
        })
    }

}