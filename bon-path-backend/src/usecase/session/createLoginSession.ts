import BaseUseCase from "@usecase/_interface";
import { SessionPayloads } from "@share/payloads";
import { SessionPayloadSchemas } from "@payload";
import { UseCaseError } from "@lib/error";
import { ERROR_MESSAGES } from "@lib/constants/errorMessages";
import { HonoJwtClient } from "@client";
import { UserRepository } from "@repository";
import { UserPasswordVerifyService } from "@service";

export class CreateLoginSessionUseCase implements BaseUseCase<
    SessionPayloads.Login.POST.Request,
    SessionPayloads.Login.POST.Response
> {
    constructor(
        public clients: { honoJwt: HonoJwtClient },
        public repositories: { user: UserRepository },
        public services: { userPasswordVerify: UserPasswordVerifyService },
    ){}

    async execute(request: SessionPayloadSchemas.Login.POST.Request) {
        const { email, password } = request.toValueObjectBody() 
        
        const user = await this.repositories.user.selectByEmail(email)
        if (!user) throw new UseCaseError(
            404,
            ERROR_MESSAGES.usecase.userNotFound.detail,
            ERROR_MESSAGES.usecase.userNotFound.issues,
            this.constructor.name,
            request.getBody
        )

        const is_correct_password = await this.services.userPasswordVerify.execute({
            hashedPassword: user.getValues.password,
            rowPassword: password
        })
        if (!is_correct_password) throw new UseCaseError(
            422,
            ERROR_MESSAGES.usecase.userPasswordIncorrect.detail,
            ERROR_MESSAGES.usecase.userPasswordIncorrect.issues,
            this.constructor.name,
            {
                hashedPassword: user.getValues.password,
                rowPassword: password
            }
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