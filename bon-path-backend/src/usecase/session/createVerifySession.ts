import BaseUseCase from "@usecase/_interface";
import { SessionPayloads } from "@share/payloads";
import { SessionPayloadSchemas } from "../../payloads";
import { HonoJwtClient } from "@client";

export class CreateVerifySessionUseCase implements BaseUseCase<
    SessionPayloads.Verify.POST.Request,
    SessionPayloads.Verify.POST.Response
> {
    constructor(
        public clients: { honoJwt: HonoJwtClient },
        public request: SessionPayloadSchemas.Verify.POST.Request
    ) {}

    async execute() {
        const { name, email, password } = this.request.toValueObjectBody();

        const jwt_token = await this.clients.honoJwt.sign({
            userName: name,
            userEmail: email,
            userPassword: password
        })

        return new SessionPayloadSchemas.Verify.POST.Response({
            cookies: {
                verifySessionId: jwt_token
            }
        })
    }
}