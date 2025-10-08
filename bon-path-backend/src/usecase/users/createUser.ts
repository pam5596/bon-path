import BaseUseCase from "@usecase/_interface";
import { UserPayloads } from "@share/payloads";
import { UsersPayloadSchemas } from "@payload";
import { HonoJwtClient } from "@client";
import { UserRepository } from "@repository";
import { UserPasswordHashService } from "@service";
import { UserEntity, VerifySessionEntity } from "@models/entity";
import { JWTPayload } from "hono/utils/jwt/types";
import { UseCaseError } from "@error";
import { ERROR_MESSAGES } from "@constants/errorMessages";

export class CreateUserUseCase implements BaseUseCase<
    UserPayloads.POST.Request,
    UserPayloads.POST.Response
> {
    constructor(
        public clients: { honoJwt: HonoJwtClient },
        public repositories: { user: UserRepository },
        public services: { userPasswordHashService: UserPasswordHashService },
        public request: UsersPayloadSchemas.POST.Request
    ) {}

    async execute() {
        const jwt_payload = await this.clients.honoJwt.verify(
            this.request.getCookies.verifySessionId
        ) as VerifySessionEntity['toPrimitives'] & JWTPayload
        const session = VerifySessionEntity.fromPrimitives(jwt_payload)

        const { email, name, password } = this.request.toValueObjectBody()
        
        if (!session.getValues.userEmail.equals(email)) 
            throw new UseCaseError(
                403,
                ERROR_MESSAGES.usecase.emailsNotEqual.detail,
                ERROR_MESSAGES.usecase.emailsNotEqual.issues,
                this.constructor.name,
                this.request.getBody
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