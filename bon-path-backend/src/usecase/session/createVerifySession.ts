import BaseUseCase from "@usecase/_interface";
import { SessionPayloads } from "@share/payloads";
import { SessionPayloadSchemas } from "@payload";
import { HonoJwtClient } from "@client";
import { UserPasswordHashService } from "@service";
import { UserRepository } from "@repository";
import { UseCaseError } from "@lib/error";
import { ERROR_MESSAGES } from "@lib/constants/errorMessages";

export class CreateVerifySessionUseCase implements BaseUseCase<
    SessionPayloads.Verify.POST.Request,
    SessionPayloads.Verify.POST.Response
> {
    constructor(
        public clients: { honoJwt: HonoJwtClient },
        public services: { userPasswordHashService: UserPasswordHashService },
        public repositories: { user: UserRepository }
    ) {}

    async execute(request: SessionPayloadSchemas.Verify.POST.Request) {
        const { name, email, password } = request.toValueObjectBody();
        const hash_password = await this.services.userPasswordHashService.execute(password);

        const user = await this.repositories.user.selectByEmail(email)
        if (user) throw new UseCaseError(
            409,
            ERROR_MESSAGES.usecase.userConflict.detail,
            ERROR_MESSAGES.usecase.userConflict.issues,
            this.constructor.name,
            request.getBody
        )

        const jwt_token = await this.clients.honoJwt.sign({
            userName: name.value,
            userEmail: email.value,
            userHashPassword: hash_password.value
        })

        return new SessionPayloadSchemas.Verify.POST.Response({
            cookies: {
                verifySessionId: jwt_token
            }
        })
    }
}