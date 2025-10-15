import BaseUseCase from "@usecase/_interface";
import { SessionPayloads } from "@share/payloads";
import { SessionPayloadSchemas } from "@payload";
import { HonoJwtClient } from "@client";

export class CreateVerifySessionUseCase implements BaseUseCase<
    SessionPayloads.Verify.POST.Request,
    SessionPayloads.Verify.POST.Response
> {
    constructor(
        public clients: { honoJwt: HonoJwtClient },
    ) {}

    async execute(request: SessionPayloadSchemas.Verify.POST.Request) {
        const { name, email, password } = request.toValueObjectBody();

        const jwt_token = await this.clients.honoJwt.sign({
            userName: name.value,
            userEmail: email.value,
            userPassword: password.value
        })

        return new SessionPayloadSchemas.Verify.POST.Response({
            cookies: {
                verifySessionId: jwt_token
            }
        })
    }
}