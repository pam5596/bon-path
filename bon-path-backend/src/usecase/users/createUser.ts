import BaseUseCase from "@usecase/_interface";
import { UserPayloads } from "@share/payloads";
import { UsersPayloadSchemas } from "@payload";
import { HonoJwtClient } from "@client";
import { UserRepository } from "@repository";
import { UserPasswordHashService } from "@service";
import { UserEntity, VerifySessionEntity } from "@models/entity";
import { UseCaseError } from "@lib/error";
import { ERROR_MESSAGES } from "@lib/constants/errorMessages";

export class CreateUserUseCase implements BaseUseCase<
    UserPayloads.POST.Request,
    UserPayloads.POST.Response
> {
    constructor(
        public clients: { honoJwt: HonoJwtClient },
        public repositories: { user: UserRepository },
        public services: { userPasswordHashService: UserPasswordHashService }
    ) {}

    async execute(request: UsersPayloadSchemas.POST.Request) {
        const jwt_payload = await this.clients.honoJwt.verify(
            request.getCookies.verifySessionId
        ) as VerifySessionEntity['toPrimitives']
        const session = VerifySessionEntity.fromPrimitives(jwt_payload)

        const { email, name, password } = request.toValueObjectBody()
        
        if (!session.getValues.userEmail.equals(email)) 
            throw new UseCaseError(
                403,
                ERROR_MESSAGES.usecase.emailsNotEqual.detail,
                ERROR_MESSAGES.usecase.emailsNotEqual.issues,
                this.constructor.name,
                request.getBody
            )

        const hash_password = await this.services.userPasswordHashService.execute(password)
        const user = new UserEntity({ name, email, password: hash_password })
        const inserted_user = await this.repositories.user.insert(user)

        return new UsersPayloadSchemas.POST.Response({
            body: {
                hashedId: inserted_user.hashedId!.value
            }
        })
    }
}