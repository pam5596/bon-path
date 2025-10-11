import BaseUseCase from "@usecase/_interface";
import { SessionPayloads } from "@share/payloads";
import { SessionPayloadSchemas } from "@payload";
import { UseCaseError } from "@lib/error";
import { ERROR_MESSAGES } from "@lib/constants/errorMessages";
import { HonoJwtClient } from "@client";
import { UserRepository } from "@repository";
import { UserPasswordHashService } from "@service";

export class CreateLoginSessionUseCase implements BaseUseCase<
    SessionPayloads.Login.POST.Request,
    SessionPayloads.Login.POST.Response
> {
    constructor(
        public clients: { honoJwt: HonoJwtClient },
        public repositories: { user: UserRepository },
        public services: { userPasswordHashService: UserPasswordHashService },
        public request: SessionPayloadSchemas.Login.POST.Request
    ){}

    async execute() {
        const { email, password } = this.request.toValueObjectBody() 
        const hash_password = await this.services.userPasswordHashService.execute(password)
        
        const user = await this.repositories.user.selectByEmailAndPassword(email, hash_password)
        if (!user) throw new UseCaseError(
            404,
            ERROR_MESSAGES.usecase.userNotFound.detial,
            ERROR_MESSAGES.usecase.userNotFound.issues,
            this.constructor.name,
            this.request.getBody
        )
        
        const jwt_token = await this.clients.honoJwt.sign({
            userId: user.id!.value,
            userHashId: user.hashedId!.value
        })

        return new SessionPayloadSchemas.Login.POST.Response({
            cookies: {
                loginSessionId: jwt_token
            }
        })

    }
}