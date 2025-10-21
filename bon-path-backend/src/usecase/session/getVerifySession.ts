import BaseUseCase from "@usecase/_interface";
import { SessionPayloads } from "@share/payloads";
import { SessionPayloadSchemas } from "@payload";
import { HonoJwtClient } from "@client";
import { VerifySessionEntity } from "@models/entity";

export class GetVerifySessionUseCase implements BaseUseCase<
    SessionPayloads.Verify.GET.Request,
    SessionPayloads.Verify.GET.Response
> {
    constructor(
        public clients: { honoJwt: HonoJwtClient },
    ){}

    async execute(request: SessionPayloadSchemas.Verify.GET.Request) {
        const jwt_payload = await this.clients.honoJwt.verify(
            request.getCookies.verifySessionId
        ) as VerifySessionEntity['toPrimitives']

        return new SessionPayloadSchemas.Verify.GET.Response({
            body: {
                userName: jwt_payload.userName,
                userEmail: jwt_payload.userEmail,
                userHashPassword: jwt_payload.userHashPassword
            }
        })
    }
}