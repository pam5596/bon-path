import BaseUseCase from "@usecase/_interface";
import { SessionPayloads } from "@share/payloads";
import { SessionPayloadSchemas } from "@payload";
import { HonoJwtClient } from "@client";
import { LoginSessionEntity } from "@models/entity";

export class GetLoginSessionUseCase implements BaseUseCase<
    SessionPayloads.Login.GET.Request,
    SessionPayloads.Login.GET.Response
> {
    constructor(
        public clients: { honoJwt: HonoJwtClient },
    ){}

    async execute(request: SessionPayloadSchemas.Login.GET.Request) {
        const jwt_payload = await this.clients.honoJwt.verify(
            request.getCookies.loginSessionId
        ) as LoginSessionEntity['toPrimitives']

        return new SessionPayloadSchemas.Login.GET.Response({
            body: {
                userHashId: jwt_payload.userHashId
            }
        })
    }

}